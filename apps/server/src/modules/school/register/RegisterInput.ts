import { Length, IsEmail, IsString, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsSchoolAlreadyExist } from "./isSchoolAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty({ message: "Name is required." })
  name: string;

  @Field()
  @IsEmail({}, { message: "Please enter valid email." })
  @IsSchoolAlreadyExist({ message: "School is already registered with us." })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Address is required." })
  address: string;
}
