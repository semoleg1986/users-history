import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });

    if (existingUser) {
      throw new ForbiddenException('Login is already in use');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT) || 10,
    );

    const newUser: User = {
      ...createUserDto,
      id: uuid4(),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: hashedPassword,
    };
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository
      .findOne({ where: { id } })
      .then((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      })
      .catch((error) => {
        console.error('Error while fetching user:', error.message);
        throw error;
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await bcrypt.compare(updateUserDto.oldPassword, user.password)) {
      const cryptSalt = process.env.CRYPT_SALT;
      const rounds = parseInt(cryptSalt) || 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.newPassword,
        rounds,
      );
      user.password = hashedPassword;
      user.version++;
      user.updatedAt = new Date();
      return await this.userRepository.save(user);
    } else {
      throw new ForbiddenException('Old password is wrong');
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);

    return user;
  }
}
