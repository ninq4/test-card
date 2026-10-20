import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Link')
export class LinkModel {
  @Field(() => ID)
  id!: string;
  @Field()
  name!: string;
  @Field()
  url!: string;
}
