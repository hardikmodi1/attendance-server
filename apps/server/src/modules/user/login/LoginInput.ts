import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: "Please enter valid email." })
  @IsNotEmpty({ message: "Email is required." })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}
