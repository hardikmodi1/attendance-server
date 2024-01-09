import { IsNotEmpty, Min } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { School } from "../School";

@ObjectType()
export class CompleteSetupOutput {
  @Field(() => School)
  school: School;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
