import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { ItemDTO } from './dto/output.dto';
import { User } from '@common/models/entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private itemService: UsersService) {}

  @Query(() => [User])
  async getAll(): Promise<User[]> {
    return await this.itemService.getAll();
  }
}
