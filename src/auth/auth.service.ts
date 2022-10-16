import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UserService, private jwtService: JwtService) {} 

  async validateUser(email: string, pass: string): Promise<any> {
    
    const user = await this.usersService.findOne(email);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
    
}
