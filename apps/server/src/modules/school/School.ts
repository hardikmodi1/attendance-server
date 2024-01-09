import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class School {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  setupComplete: boolean;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  address: string;

  @Field((type) => String, { nullable: true })
  headName?: string | null;
}
