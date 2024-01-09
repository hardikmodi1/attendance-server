import { IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsTokenValid } from "./isTokenValid";

@InputType()
export class CompleteSetupInput {
  @Field()
  @IsNotEmpty({ message: "Token is required." })
  @IsTokenValid({
    message: "School setup is already done, or link has expired.",
  })
  token: string;

  @Field()
  @IsNotEmpty({ message: "Head name is required." })
  headName: string;

  @Field()
  @MinLength(6, { message: "Password should be atleast 6 characters long." })
  password: string;
}
