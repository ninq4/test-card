import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Link')
export class LinkModel {
  @Field(() => ID)
  id!: string;
  @Field()
  name!: string;
  @Field()
  url!: string;
  @Field(() => Int)
  sortOrder!: number;
}
