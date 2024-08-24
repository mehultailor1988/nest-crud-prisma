
import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';


export class CreateStatetDto { 
  @ApiProperty({ description: 'State Code is required' })
  @IsNotEmpty({ message: "State Code is required" })
  StateCode: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty({ message: "Country Code is required" })
  StateName: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @ApiProperty({ description: 'Active is required' })
  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;

  @ApiProperty({ description: 'Sort Sequence is required' })
  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}



export async function validateDto(dto: CreateStatetDto): Promise<void> {
  const instance = plainToInstance(CreateStatetDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}