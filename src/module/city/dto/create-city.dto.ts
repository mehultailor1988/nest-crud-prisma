import {  IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
 
  @ApiProperty({ description: 'City Name is required' })
  @IsNotEmpty({ message: "City Name is required" })
  CityName: string;

  @ApiProperty({ description: 'State Code is required' })
  @IsNotEmpty({ message: "State Code is required" })
  StateCode: string;
  
  @ApiProperty({ description: 'Country Code is required' })
  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @ApiProperty({ description: 'Active is required' })
  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;
  
  @ApiProperty({ description: 'Sort Sequence is required' })
  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}

export async function validateDto(dto: CreateCityDto): Promise<void> {
  const instance = plainToInstance(CreateCityDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}