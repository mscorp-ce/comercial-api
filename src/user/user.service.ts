

import { Injectable, Inject } from '@nestjs/common';
import { ResponseDTO } from 'src/dto/respense.dto';
import { UserDTO } from 'src/dto/user.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    var user: User;
    user = await this.userRepository.findOneBy({
      iduser: id,
    })
    console.log(id)
    console.log(user)

    return user;
  }

  async save(userDTO: UserDTO): Promise<ResponseDTO> {
    let user = new User()
    user.name = userDTO.name
    user.email = userDTO.email

    var salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(userDTO.password, salt)
    user.telefone = userDTO.telefone
    user.cpf = userDTO.cpf

    return await this.userRepository.save(user).then((result) => {
      return <ResponseDTO>{
        status: true,
        menssage: 'User registered successfully'
      }  
    }).catch((error) => {
      return <ResponseDTO>{
        status: false,
        menssage: 'There was an error registering the user'
      }
    })
  }

   // Autenticação!!!
   async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where:
      { email: email }
  });
  }

}