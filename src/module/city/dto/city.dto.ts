import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength, validate } from "class-validator";
import { AbstractDto } from "src/common";
import { ApiProperty } from '@nestjs/swagger';

export class CityDto extends AbstractDto {
  @IsNotEmpty()
  CityName: string;

  @IsNotEmpty()
  StateCode: string;

  @IsNotEmpty()
  CountryCode: string;

  @IsNotEmpty()
  Active: boolean;

  @IsNotEmpty()
  SortSeq: number;
}