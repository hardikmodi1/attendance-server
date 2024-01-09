import { createUnionType } from "type-graphql";
import { School } from "../../school/School";
import { Field, InputType, ObjectType } from "type-graphql";

const SchoolOrUser = createUnionType({
  name: "SchoolOrUser",
  types: () => [School] as const,
  resolveType: (value) => {
    return School;
  },
});

@ObjectType()
export class LoginOutput {
  @Field(() => SchoolOrUser)
  schoolOrUser: typeof SchoolOrUser;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
