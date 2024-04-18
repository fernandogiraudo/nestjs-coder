import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[];
  constructor() {
    this.users = [];
  }
  create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.last_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);
    }
    const newUser = {
      ...createUserDto,
      id: Math.floor(Math.random() * 10000),
    };
    this.users.push(newUser);
    return { message: 'user added', payload: newUser };
  }

  findAll() {
    const users = this.users;
    return { status: 'success', payload: users };
  }

  findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'user found', payload: user };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index < 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };
    return { message: 'User updated', payload: this.users[index] };
  }

  remove(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== user.payload.id);
    return { message: 'user deleted' };
  }
}
