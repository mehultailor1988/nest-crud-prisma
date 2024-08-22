import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

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

    /**
   * Country code (e.g., 'US').
   * 
   * @type {string}
   * @example 'US'
   */
  @Expose()
  CountryCode: string;

/**
   * Name of the country (e.g., 'United States').
   * 
   * @type {string}
   * @example 'United States'
   */
  @Expose()
  CountryName: string;

   /**
   * Status indicating if the country is active or not.
   * 
   * @type {boolean}
   * @example true/false
   */
  @Expose()
  Active: boolean;

   /**
   * Sort sequence for ordering countries.
   * 
   * @type {number}
   * @example 1
   */
  @Expose()
  SortSeq: number;
}