import _ from 'lodash';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { COLLECTION_NAME } from '@common/constants/enum';
import { Property } from '@common/decorators/property.decorator';
import { UserRoles } from '@common/constants';
import { Field } from '@nestjs/graphql';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: COLLECTION_NAME.USER,
})
export class User extends Document {
  @Field(() => String)
  @Property({ type: String.name })
  @Prop({ type: String })
  id: string;

  @Field(() => String)
  @Property({ type: String.name })
  @Prop({ type: String, required: true })
  full_name: string;

  @Field(() => String)
  @Property({ type: String.name })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Field(() => String)
  @Property({ type: String.name })
  @Prop({ type: String })
  phone: string;

  @Field(() => String)
  @Property({ type: String.name, ref: COLLECTION_NAME.ROLE })
  @Prop({ enum: UserRoles, type: Object })
  roles: UserRoles;

  @Field(() => String)
  @Property({ type: String.name })
  @Prop({ type: String })
  password: string;

  @Field(() => Boolean)
  @Property({ type: Boolean.name })
  @Prop({ type: Boolean })
  activated: boolean;

  @Field(() => Number)
  @Property({ type: Number.name })
  @Prop({ default: 1 })
  is_active: number;

  // @Property({ type: String.name })
  // @Prop({ type: String })
  // refresh_token: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
