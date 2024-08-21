import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ItemDTO {
  @Field(() => ID)
  id: string;

  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  roles: string;

  @Field()
  password: string;

  @Field()
  activated: string;

  @Field()
  is_active: string;
}
