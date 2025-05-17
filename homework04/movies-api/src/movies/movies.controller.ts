import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';
import { QueryMoviesDto } from './dto/query-movies.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiBody({
    required: true,
    type: CreateMovieDto,
  })
  @ApiBadRequestResponse({ description: 'Movie already exists' })
  @ApiOperation({ summary: 'Endpoint that creates a movie' })
  @ApiResponse({ status: 201, description: 'Movie created successfully' })
  @HttpCode(201)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Endpoint that fetches all movies' })
  @ApiInternalServerErrorResponse({
    description: "The server couldn't fetch the movies",
  })
  @ApiResponse({ status: 200, description: 'Movies found successfully' })
  @ApiQuery({ name: 'genre', required: false, type: 'string' })
  @ApiQuery({ name: 'title', required: false, type: 'string' })
  @ApiQuery({ name: 'maxDuration', required: false, type: 'number' })
  @ApiQuery({ name: 'minRating', required: false, type: 'number' })
  @ApiQuery({ name: 'duration', required: false, type: 'number' })
  @ApiQuery({ name: 'rating', required: false, type: 'number' })
  @ApiQuery({ name: 'releaseYear', required: false, type: 'number' })
  @HttpCode(200)
  @Get()
  async findAll(@Query() query: QueryMoviesDto) {
    return this.moviesService.findAll(query);
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
  })
  @ApiBadRequestResponse({ description: 'Invalid movie ID format' })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  @ApiOperation({ summary: 'Endpoint that fetches a movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'Movie found successfully',
    type: Movie,
  })
  @ApiBadRequestResponse({ description: 'ID not found' })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({ summary: 'Endpoint that updates a movie' })
  @ApiBadRequestResponse({
    description: 'Invalid movie ID format or movie data',
  })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  @ApiResponse({ status: 204, description: 'Movie updated successfully' })
  @HttpCode(204)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiOperation({ summary: 'Endpoint that updates a movie' })
  @ApiBadRequestResponse({ description: 'Invalid movie ID format' })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  @ApiResponse({ status: 204, description: 'Movie deleted successfully' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
