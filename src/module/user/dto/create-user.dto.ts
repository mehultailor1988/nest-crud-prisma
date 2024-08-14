import {  IsEmail, IsEmpty, IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
   email: string;

  @IsNotEmpty({ message: "name is required" })
  name: string;
}
