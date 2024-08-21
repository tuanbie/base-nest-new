import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UserService } from '@modules/user/user.service';
import { ModelsModule } from '@common/models/models.module';
import { UsersService } from './user.service';

@Module({
  imports: [ModelsModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersResolver, UsersService],
})
export class UsersModule {}
