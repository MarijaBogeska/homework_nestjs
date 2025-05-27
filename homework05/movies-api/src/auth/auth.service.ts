import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dtos/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  //   Register
  async registerUser(userData: CreateUserDto) {
    const isExistingUser = await this.usersService.findOneByEmail(
      userData.email,
    );
    if (isExistingUser) throw new BadRequestException('user already exists');

    const hashedPass = await hash(userData.password, 8);
    userData.password = hashedPass;

    await this.usersService.create(userData);
  }
  // Login And Access Token
  async loginUser(userData: CredentialsDto) {
    const isExistingUser = await this.usersService.findOneByEmail(
      userData.email,
    );
    if (!isExistingUser) throw new UnauthorizedException('invalid credentials');
    const isPassValid = await compare(
      userData.password,
      isExistingUser.password,
    );
    if (!isPassValid) throw new UnauthorizedException('invalid credentials');

    // Access Token
    const accessToken = await this.jwtService.signAsync({
      userId: isExistingUser.id,
    });
    // Refresh Token
    const refreshToken = await this.jwtService.signAsync(
      { userId: isExistingUser.id },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    await this.usersService.saveRefreshToken(isExistingUser.id, refreshToken);
    const { password, refreshTokens, ...userWithoutPass } = isExistingUser;
    return {
      user: userWithoutPass,
      accessToken,
      refreshToken,
    };
  }
  // Refresh Access Token
  async refreshAccessToken(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findOne(userId);

      const isExistingToken = user.refreshTokens.some(
        (token) => token === refreshToken,
      );

      if (!isExistingToken) throw new Error();

      const token = await this.jwtService.signAsync({ userId: user.id });
      return { token };
    } catch (error) {
      throw new ForbiddenException();
    }
  }
  // Logout
  async logoutUser(refreshToken: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      await this.usersService.deleteRefreshToken(userId, refreshToken);
    } catch (error) {
      throw new BadRequestException("couldn't logout user");
    }
  }
}
