import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto { 
  
   /**
   * Country code (e.g., 'US').
   * 
   * @type {string}
   * @example 'US'
   */
   @ApiProperty({ description: 'Country Code is required' })
  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

   /**
   * Country name (e.g., 'United States').
   * 
   * @type {string}
   * @example 'United States'
   */
   @ApiProperty({ description: 'Country Name is required' })
  @IsNotEmpty({ message: "Country Name is required" })
  CountryName: string;

  /**
   * Status of the country (active/inactive).
   * 
   * @type {boolean}
   * @example true/false
   */
  @ApiProperty({ description: 'Active is required' })
  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;

   /**
   * Sort sequence for ordering the countries.
   * 
   * @type {number}
   * @example 1
   */
   @ApiProperty({ description: 'Sort Sequence is required' })
  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}


/**
 * Validates the given DTO instance based on the class-validator rules.
 * 
 * @function validateDto
 * @param {CreateCountryDto} dto - The DTO instance to validate.
 * @throws {Error} Throws an error if validation fails, including a message listing all validation issues.
 * 
 * @example
 * // Example usage
 * const countryDto = new CreateCountryDto();
 * countryDto.CountryCode = 'US';
 * countryDto.CountryName = '';
 * countryDto.Active = true;
 * countryDto.SortSeq = 1;
 * 
 * validateDto(countryDto)
 *   .then(() => {
 *     console.log('DTO is valid');
 *   })
 *   .catch(error => {
 *     console.error('Validation error:', error.message);
 *   });
 */
export async function validateDto(dto: CreateCountryDto): Promise<void> {
  const instance = plainToInstance(CreateCountryDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}