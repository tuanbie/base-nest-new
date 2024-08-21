import { Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { ItemDTO } from './dto/output.dto';
import { User } from '@common/models/entity';

@Resolver(() => ItemDTO)
export class UsersResolver {
  constructor(private itemService: UsersService) {}

  @Query(() => [ItemDTO])
  async getAll(): Promise<[ItemDTO]> {
    return await this.itemService.getAll();
  }
}
