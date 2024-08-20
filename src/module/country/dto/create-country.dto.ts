import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export class CreateCountryDto {  
  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @IsNotEmpty({ message: "Country Name is required" })
  CountryName: string;

  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;

  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}



export async function validateDto(dto: CreateCountryDto): Promise<void> {
  const instance = plainToInstance(CreateCountryDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}