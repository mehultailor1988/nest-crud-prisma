
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateStatetDto {  
  @IsNotEmpty({ message: "State Code is required" })
  StateCode: string;

  @IsNotEmpty({ message: "State Name is required" })
  StateName: string;

  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;

  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}
