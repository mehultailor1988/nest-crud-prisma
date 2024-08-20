import {  IsEmail, IsEmpty, IsNotEmpty, Matches, validate ,  } from "class-validator";
import { plainToInstance } from "class-transformer";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
   email: string;

  @IsNotEmpty({ message: "name is required" })
  name: string;
}

export async function validateDto(dto: CreateUserDto): Promise<void> {
  const instance = plainToInstance(CreateUserDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}
