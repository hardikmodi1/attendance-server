import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { prisma } from "../../client";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { LoginInput } from "./login/LoginInput";
import { ValidationError } from "class-validator";
import { LoginOutput } from "./login/LoginOutput";

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginOutput)
  async login(
    @Arg("loginInput") { email, password }: LoginInput
  ): Promise<LoginOutput> {
    const school = await prisma.school.findFirst({
      where: { email },
    });

    if (!school || !school.password) {
      const validationError = new ValidationError();
      validationError.property = "email";
      validationError.constraints = {
        type: "email",
      };
      throw validationError;
    }

    const isPasswordValid = await compare(password, school.password);
    if (!isPasswordValid || !school.setupComplete) {
      const validationError = new ValidationError();
      validationError.property = "email";
      validationError.constraints = {
        type: "email",
      };
      throw validationError;
    }

    return {
      schoolOrUser: school,
      accessToken: sign(
        { schoolId: school.id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      ),
      refreshToken: sign(
        { schoolId: school.id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "14d" }
      ),
    };
  }
}
