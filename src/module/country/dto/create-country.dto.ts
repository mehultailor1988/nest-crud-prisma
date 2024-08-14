import { IsEmail, IsNotEmpty } from "class-validator";

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