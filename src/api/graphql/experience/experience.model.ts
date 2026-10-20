import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceModel {
  @Field(() => ID)
  id!: string;
  @Field()
  company!: string;
  @Field()
  position!: string;
  @Field(() => String, { nullable: true })
  location!: string | null;
  @Field(() => String, { nullable: true })
  description!: string | null;
  @Field(() => Date)
  startDate!: Date;
  @Field(() => Date, { nullable: true })
  endDate!: Date | null;
}
