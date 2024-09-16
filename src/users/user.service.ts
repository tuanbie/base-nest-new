import { User } from '@common/models/entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const results = await this.userModel.find({}).exec();
    return results;
  }
}
