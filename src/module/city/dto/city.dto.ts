import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class CityDto extends AbstractDto {
  @Expose()
  CityName: string;

  @Expose()
  StateCode: string;

  @Expose()
  CountryCode: string;

  @Expose()
  Active: boolean;

  @Expose()
  SortSeq: number;
}