import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    required: true,
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiOperation({ summary: 'Endpoint that register a User' })
  @ApiResponse({ status: 201 })
  @HttpCode(201)
  @Post('register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }

  @ApiBody({
    required: true,
    type: CredentialsDto,
  })
  @ApiBadRequestResponse({ description: 'User does not exists' })
  @ApiOperation({ summary: 'Endpoint that login a User' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() credentials: CredentialsDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } =
      await this.authService.loginUser(credentials);

    res.set('access-token', accessToken);
    res.set('refresh-token', refreshToken);

    res.json(user);
  }

  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiOperation({ summary: 'Endpoint that refresh access token from the user' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('refresh-token')
  async refreshAccessToken(
    @Res() res: Response,
    @Headers('refresh-token') refreshToken: string,
  ) {
    const { token } = await this.authService.refreshAccessToken(refreshToken);

    res.set('access-token', token);

    res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiBadRequestResponse({ description: 'Invalid token' })
  @ApiOperation({ summary: 'Endpoint that logout the User' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logoutUser(@Headers('refresh-token') refreshToken: string) {
    return this.authService.logoutUser(refreshToken);
  }
}
