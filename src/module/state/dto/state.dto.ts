import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class StateDto extends AbstractDto {
  @Expose()
  StateCode: string;

  @Expose()
  StateName: string;

  @Expose()
  CountryCode: string;

  @Expose()
  Active: boolean;

  @Expose()
  SortSeq: number;

}