import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { School } from "./School";
import { RegisterInput } from "./register/RegisterInput";
import { prisma } from "../../client";
import { ValidationError } from "class-validator";
import { v4 } from "uuid";
import { CompleteSetupInput } from "./completeSetup/CompleteSetupInput";
import { hash } from "bcrypt";
import { CompleteSetupOutput } from "./completeSetup/CompleteSetupOutput";
import { sign } from "jsonwebtoken";

@Resolver((of) => School)
export class RegisterResolver {
  @Mutation(() => School)
  async registerSchool(
    @Arg("registerInput", { nullable: false })
    { address, email, name }: RegisterInput
  ): Promise<School> {
    const school = await prisma.school.create({
      data: { address, email, name, token: v4() },
      select: {
        id: true,
        address: true,
        createdAt: true,
        email: true,
        setupComplete: true,
        name: true,
      },
    });
    return school;
  }

  @Mutation(() => CompleteSetupOutput)
  async completeSetup(
    @Arg("completeSetupInput", { nullable: false })
    { headName, password, token }: CompleteSetupInput
  ): Promise<CompleteSetupOutput> {
    const school = await prisma.school.findFirst({
      where: { token, setupComplete: false },
    });
    if (!school) {
      throw new Error("Something went wrong");
    }
    const updatedSchool = await prisma.school.update({
      where: { email: school.email },
      data: {
        headName,
        password: await hash(password, 12),
        token: "",
        setupComplete: true,
      },
      select: {
        id: true,
        address: true,
        createdAt: true,
        email: true,
        setupComplete: true,
        name: true,
        headName: true,
      },
    });
    return {
      school: updatedSchool,
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

  @Query(() => String)
  async getAccessToken() {
    return "hello";
  }
}
