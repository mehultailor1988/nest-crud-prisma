import {
  Body,
  Controller,
  Delete,
  Get,  
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CountryService } from '../services/country.service';
import { Country as CountryModel } from "@prisma/client";
import { UpdateCountryDto } from "../dto";
import { CountryDto } from "../dto/country.dto";
import { CreateCountryDto } from "../dto/create-country.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

/**
   * @route GET /country
   * @description Retrieves a list of all countries from the database.
   * @returns An array of country objects.
   * @throws Throws a 500 Internal Server Error if data retrieval fails.
   * @example
   * curl -X GET http://localhost:3000/country
   * 
   * Response:
   * [
   *   {
   *     "id": "1",
   *     "CountryCode": "US",
   *     "CountryName": "United States",
   *     "Active": true,
   *     "SortSeq": 1
   *   },
   *   {
   *     "id": "2",
   *     "CountryCode": "CA",
   *     "CountryName": "Canada",
   *     "Active": true,
   *     "SortSeq": 2
   *   }
   * ]
   */

  @Get()
  @ApiOperation({ summary: 'Retrieve all countries' })
  @ApiResponse({ status: 200, description: 'List of all countries', type: [CountryDto] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllCountry() {
    return this.countryService.getAllCountry();
  }

/**
   * @route GET /country/:id
   * @description Retrieves a single country by its unique ID.
   * @param {string} id - The unique identifier of the country.
   * @returns The country object with the specified ID.
   * @throws Throws a 404 Not Found error if the country with the specified ID does not exist.
   * @example
   * curl -X GET http://localhost:3000/country/1
   * 
   * Response:
   * {
   *   "id": "1",
   *   "CountryCode": "US",
   *   "CountryName": "United States",
   *   "Active": true,
   *   "SortSeq": 1
   * }
   * 
   * Error Response:
   * {
   *   "statusCode": 404,
   *   "message": "Country not found"
   * }
   */

  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a country by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
  @ApiResponse({ status: 200, description: 'Country details', type: CountryDto })
  @ApiResponse({ status: 404, description: 'Country not found' })
    async getCountry(@Param("id") id: string) {
      return this.countryService.country({ id: id });
    }

/**
   * @route POST /country
   * @description Creates a new country with the provided details.
   * @param  Data transfer object containing the details of the country to be created.
   * @returns  The newly created country object.
   * @throws Throws a 400 Bad Request error if the input data is invalid or creation fails.
   * @example
   * curl -X POST http://localhost:3000/country \
   *   -H "Content-Type: application/json" \
   *   -d '{
   *         "CountryCode": "IND",
   *         "CountryName": "INDIA",
   *         "Active": true,
   *         "SortSeq": 1
   *       }'
   * 
   * Response:
   * {
   *   "id": "3",
   *   "CountryCode": "IND",
   *   "CountryName": "INDIA",
   *   "Active": true,
   *   "SortSeq": 1
   * }
   * 
   * Error Response:
   * {
   *   "statusCode": 400,
   *   "message": "Invalid input data"
   * }
   */

    @Post()
    @ApiOperation({ summary: 'Create a new country' })
    @ApiBody({ type: CreateCountryDto })
    @ApiResponse({ status: 201, description: 'Country created successfully', type: CountryDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async signupCountry(
      @Body() CountryData: { CountryCode: string, CountryName: string, Active: boolean, SortSeq: number },
    ): Promise<CountryModel> {
      return this.countryService.createCountry(CountryData);
    }

    /**
   * @route PUT /country/:id
   * @description Updates an existing country identified by its unique ID.
   * @param  The unique identifier of the country to be updated.
   * @param  The updated country data.
   * @returns The updated country object.
   * @throws Throws a 404 Not Found error if the country with the specified ID does not exist.
   * @example
   * curl -X PUT http://localhost:3000/country/1 \
   *   -H "Content-Type: application/json" \
   *   -d '{
   *         "CountryCode": "IND",
   *         "CountryName": "INDIA",
   *         "Active": true,
   *         "SortSeq": 1
   *       }'
   * 
   * Response:
   * {
   *   "id": "1",
   *   "CountryCode": "IND",
   *   "CountryName": "INDIA",
   *   "Active": true,
   *   "SortSeq": 1
   * }
   * 
   * Error Response:
   * {
   *   "statusCode": 404,
   *   "message": "Country not found"
   * }
   */

    @Put(":id")
    @ApiOperation({ summary: 'Update a country by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
    @ApiBody({ type: UpdateCountryDto })
    @ApiResponse({ status: 200, description: 'Country updated successfully', type: CountryDto })
    @ApiResponse({ status: 404, description: 'Country not found' })
    async updateCountry(
      @Param("id") id: string,
      @Body() CountryData: { CountryCode: string, CountryName: string, Active: boolean, SortSeq: number },
    ): Promise<CountryModel> {
      return this.countryService.updateCountry(id,CountryData,);
    }
/**
   * @route DELETE /country/:id
   * @description Deletes a country identified by its unique ID.
   * @param  The unique identifier of the country to be deleted.
   * @returns The deleted country object.
   * @throws  Throws a 404 Not Found error if the country with the specified ID does not exist.
   * @example
   * curl -X DELETE http://localhost:3000/country/10
   * 
   * Response:
   * {
   *   "id": "1",
   *   "CountryCode": "IND",
   *   "CountryName": "INDIA",
   *   "Active": true,
   *   "SortSeq": 1
   * }
   * 
   * Error Response:
   * {
   *   "statusCode": 404,
   *   "message": "Country not found"
   * }
   */

    @Delete(":id")
    @ApiOperation({ summary: 'Delete a country by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
    @ApiResponse({ status: 200, description: 'Country deleted successfully', type: CountryDto })
    @ApiResponse({ status: 404, description: 'Country not found' })
    async deleteCountry(@Param("id") id: string): Promise<CountryModel> {
      return this.countryService.deleteCountry({ id: id });
    }
}
