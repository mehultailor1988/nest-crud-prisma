import {  IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export class CreateCityDto {
 
  @IsNotEmpty({ message: "City Name is required" })
  CityName: string;

  @IsNotEmpty({ message: "State Code is required" })
  StateCode: string;
  
  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;
  
  @IsNotEmpty({ message: "Active is required" })
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