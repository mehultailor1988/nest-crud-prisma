import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";
import { IsEmail, IsNotEmpty, IsString, MinLength, validate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for representing a country.
 * 
 * @class CountryDto
 * @extends AbstractDto
 * @description This class is used to transfer country data between layers or services.
 * It extends the `AbstractDto` which might include common DTO properties or methods.
 * 
 * @example
 * // Example usage
 * const countryDto = new CountryDto();
 * countryDto.CountryCode = 'US';
 * countryDto.CountryName = 'United States';
 * countryDto.Active = true;
 * countryDto.SortSeq = 1;
 */

export class CountryDto extends AbstractDto {

  @ApiProperty({ example: '1', description: 'The unique identifier of the country' })
  id: string;
    /**
   * Country code (e.g., 'US').
   * 
   * @type {string}
   * @example 'US'
   */
  @ApiProperty({ example: 'US', description: 'The country code' })
  @IsNotEmpty()
  CountryCode: string;

/**
   * Name of the country (e.g., 'United States').
   * 
   * @type {string}
   * @example 'United States'
   */
  @ApiProperty({ example: 'United States', description: 'The name of the country' })
  @IsNotEmpty()
  CountryName: string;

   /**
   * Status indicating if the country is active or not.
   * 
   * @type {boolean}
   * @example true/false
   */
  @ApiProperty({ example: true, description: 'Whether the country is active' })
  @IsNotEmpty()
  Active: boolean;

   /**
   * Sort sequence for ordering countries.
   * 
   * @type {number}
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'Sort sequence number' })
  @IsNotEmpty()
  SortSeq: number;
}