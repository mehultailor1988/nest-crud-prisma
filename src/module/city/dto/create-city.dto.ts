import {  IsNotEmpty } from "class-validator";

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
