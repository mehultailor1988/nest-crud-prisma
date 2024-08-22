import { IsEmail, IsNotEmpty, IsString, MinLength, validate } from "class-validator";
import { AbstractDto } from "src/common";
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class UserDto extends AbstractDto {
  @IsEmail()
  @MinLength(15)
  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  //@Exclude()
  @IsString()
  password: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty({ message: "email is required" })
  phone: string;

  // @ApiProperty({ description: 'The name of the user' })
  // @IsString()
  // name: string;
}

