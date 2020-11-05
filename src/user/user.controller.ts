import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDTO } from 'src/models/user.model';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() { username }: UserEntity) {
    const user = await this.authService.findCurrentUser(username);
    return { user };
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(
    @User() { username }: UserEntity,
    @Body('user', new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateUserDTO,
  ){
    const user = await this.authService.updateUser(username, data);
    return { user };
  }
}