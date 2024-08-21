import {  IsEmail, IsEmpty, IsNotEmpty, Matches, MinLength, validate ,  } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
   email: string;

   /**
   * The password field must be provided and adhere to specific security requirements.
   * 
   * Validation Rules:
   * - The password cannot be empty.
   * - It must be between 6 and 64 characters long.
   * - It must include at least:
   *   - One lowercase letter (a-z)
   *   - One uppercase letter (A-Z)
   *   - One digit (0-9)
   *   - One special character from the set @$!%*?&
   * 
   * @example
   * // Valid passwords
   * 'Password1!' // Meets all criteria
   * 'P@ssw0rd123' // Meets all criteria
   * 
   * @example
   * // Invalid passwords
   * 'password' // Missing uppercase letter, digit, and special character
   * 'PASSWORD1!' // Missing lowercase letter
   * 'Pass123' // Missing special character
   */
   @ApiProperty({ description: 'The password of the user' })
   @IsNotEmpty({ message: "password is required" })
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,64}$/, {
    message: 'Password must be between 6 and 64 characters long and include at least one special character, one uppercase letter, and one number.',
  })
   password: string;

 /**
   * The phone number field must be provided and adhere to specific format requirements.
   * 
   * Validation Rules:
   * - The phone number cannot be empty.
   * - It should be a valid phone number format that may include:
   *   - An optional international dialing code, starting with a '+' followed by 1 to 3 digits.
   *   - An optional area code, which can be enclosed in parentheses.
   *   - The main number, which can be separated by dashes, periods, or spaces.
   *   - The total number of digits should be between 6 and 15.
   * 
   * @example
   * // Valid phone numbers
   * '+1 123-456-7890' // International format with separators
   * '1234567890'       // Local format without separators
   * '+44 20 7946 0958' // UK format with international code and spaces
   * 
   * @example
   * // Invalid phone numbers
   * '123-456-789'     // Too short, should be between 6 and 15 digits
   * '+1 (123) 456-78901' // Too long, more than 15 digits
   * '12345abc'        // Contains non-numeric characters
   */
 @ApiProperty({ description: 'The phone of the user' })
 @IsNotEmpty({ message: 'Phone number is required' })
 @MinLength(10)
 @Matches(/^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)\d{1,4}([-.\s]?\d{1,4}){1,3}$/, {
   message: 'The phone number must be in a valid format, including optional international and area codes, with 6 to 15 digits in total. Use separators like dashes, periods, or spaces as needed. Please avoid invalid characters.',
 })
   phone: string;

  @ApiProperty({ description: 'The name of the user' })
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
