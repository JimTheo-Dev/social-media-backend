import {
    Controller,
    Get,
    Param,
    NotFoundException,
    Post,
    Delete,
    UseGuards,
    HttpCode,
  } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard';
  @Controller('profiles')
  export class ProfileController {
    constructor(private userService: UserService) {}

    @Get('/:username')
    @UseGuards(new OptionalAuthGuard())
    async findProfile(
      @User() user: UserEntity,
      @Param('username') username: string) {
      const profile = await this.userService.findByUsername(username, user);
      if (!profile) {
        throw new NotFoundException();
      }
      return { profile };
    }

    @Post('/:username/send-friend-request')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async sendFriendReq(
      @User() user: UserEntity,
      @Param('username') username: string) {
      const profile = await this.userService.sendFriendReq(user, username);
      return { profile };
    } 

    @Get('/:username/friend-request')
    @UseGuards(AuthGuard())
    async getFriendReq(
      @User() user: UserEntity,
      @Param('username') username: string) {
      const profile = await this.userService.getFriendReq(user, username);
      return { profile }
    }


    
    @Post('/:username/accept-friend-request')
    @HttpCode(200)
    @UseGuards(AuthGuard())
    async acceptUser(
      @User() user: UserEntity,
      @Param('username') username: string) 
    {
      const profile = await this.userService.acceptUser(user, username);
      return { profile };
    }


  
    @Delete('/:username/unfriend')
    @UseGuards(AuthGuard())
    async unfriendUser(
      @User() user: UserEntity,
      @Param('username') username: string,
    ) {
      const profile = await this.userService.unfriendUser(user, username);
      return { profile };
    }
  }