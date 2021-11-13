import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idSeq = 0;

  create(createUserDto: CreateUserDto) {
    this.users.push({
      ...createUserDto,
      id: this.idSeq++,
    });
    return this.users.at(-1);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    this.users[i] = {
      ...this.users[i],
      ...updateUserDto,
    };
    return this.users[i];
  }

  remove(id: number): User {
    const i = this.users.findIndex((user) => user.id == id);
    if (i === -1) return null;
    const user = this.users[i];
    this.users.splice(i, 1);
    return user;
  }
}
