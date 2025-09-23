import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
// auth tradicionally handles password hashing
  // async create(createUserDto: CreateUserDto) {
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
  //   const createdUser = new this.userModel({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });
  //   return createdUser.save();
  // }


  // auth service will use this method
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findAll() {
    return this.userModel.find().exec();  
  }

  findOne(id: number) {
    return this.userModel.findById(id).exec();

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
