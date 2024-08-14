import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class CountryDto extends AbstractDto {
  @Expose()
  CountryCode: string;

  @Expose()
  CountryName: string;

  @Expose()
  Active: boolean;

  @Expose()
  SortSeq: number;
}