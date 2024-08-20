import { IsEmail, IsNotEmpty, IsString, MinLength, validate } from "class-validator";
import { AbstractDto } from "src/common";


export class UserDto extends AbstractDto {
  @IsEmail()
  @MinLength(15)
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @IsString()
  name: string;
}

// const user = new UserDto();
// user.email = '';
// user.name = '';

// validate(user).then(errors => {
//   if (errors.length > 0) {
//     console.log('Validation failed. Errors: ', errors);
//   } else {
//     console.log('Validation succeed.');
//   }
// });
