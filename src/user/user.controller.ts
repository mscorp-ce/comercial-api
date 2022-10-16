import { Controller, Get, Post, Body, Request } from '@nestjs/common';

import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ResponseDTO } from 'src/dto/respense.dto';
import { UserDTO } from 'src/dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService, private authService: AuthService) {}   

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(id: number): Promise<User> {
    return await this.userService.findById(id);
  } 

  @Post()
  async save(@Body() userDTO: UserDTO): Promise<ResponseDTO> {
    return await this.userService.save(userDTO)
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/token')
  async token(@Request() req) {
    return this.authService.login(req.user); 
  }

}
