import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";
import { IsNotEmpty } from "class-validator";

export class StateDto extends AbstractDto {
  @IsNotEmpty()
  StateCode: string;

  @IsNotEmpty()
  StateName: string;

  @IsNotEmpty()
  CountryCode: string;

  @IsNotEmpty()
  Active: boolean;

  @IsNotEmpty()
  SortSeq: number;

}