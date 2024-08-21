import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ItemDTO {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Date)
  updated: Date;

  @Field((type) => Date)
  created: Date;
}
