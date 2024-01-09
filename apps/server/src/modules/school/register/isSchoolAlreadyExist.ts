import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { prisma } from "../../../client";

@ValidatorConstraint({ async: true })
export class IsSchoolAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string) {
    return prisma.school.findFirst({ where: { email } }).then((school) => {
      if (school) {
        return false;
      }
      return true;
    });
  }
}

export function IsSchoolAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSchoolAlreadyExistConstraint,
    });
  };
}
