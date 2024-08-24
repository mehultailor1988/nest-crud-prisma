import {
  Body,
  Controller,
  Delete,
  Get,  
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
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
   * @summary Retrieve all countries
   * @description Retrieves a list of all countries with their details.
   * @url GET http://localhost:3000/country
   * @returns {object} 200 - Successfully retrieved the list of all countries
   * @returns {object} 500 - Internal server error occurred
   * @example response - 200 - List of all countries
   * {
   *   "statusCode": 200,
   *   "message": "Countries retrieved successfully.",
   *   "data": [
   *     {
            "id": "515189d3-5979-4892-a8c5-e37dab2477e9",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2,
            "CountryName": "INDIA"
        },
        {
            "id": "7d1db8c9-3e1d-4de4-b510-2c217f3dc73a",
            "CountryCode": "AUS",
            "Active": true,
            "SortSeq": 3,
            "CountryName": "AUSTRALIA"
        }
   *   ]
   * }
   * @example response - 500 - Internal server error
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error."
   * }
   */

  @Get()
  @ApiOperation({ summary: 'Retrieve all countries' })
  @ApiResponse({
    status: 200,
    description: 'List of all countries',
    schema: {
      example: {
        statusCode: 200,
        message: 'Countries retrieved successfully',
        data: [
          {
            "id": "515189d3-5979-4892-a8c5-e37dab2477e9",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2,
            "CountryName": "INDIA"
        },
        {
            "id": "7d1db8c9-3e1d-4de4-b510-2c217f3dc73a",
            "CountryCode": "AUS",
            "Active": true,
            "SortSeq": 3,
            "CountryName": "AUSTRALIA"
        }
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async getAllCountry(): Promise<{ statusCode: number; message: string; data: CountryDto[] }> {
  //return this.userService.getAllUsers();
    try {
      return await this.countryService.getAllCountry();
    } catch (e) {
      throw new HttpException(
        e.message || 'Unable to retrieve users',
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @summary Retrieve a specific country by its ID
   * @description Retrieves details of a specific country identified by its ID.
   * @url GET http://localhost:3000/country/{id}
   * @param id - The unique identifier of the country
   * @returns {object} 200 - Successfully retrieved the country details
   * @returns {object} 404 - Country not found with the provided ID
   * @example response - 200 - Country details
   * {
   *   "statusCode": 200,
   *   "message": "Country retrieved successfully.",
   *   "data": 
   *      {  
   *        "id": "515189d3-5979-4892-a8c5-e37dab2477e9",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2,
            "CountryName": "INDIA" 
          }
   * }
   * @example response - 404 - Country not found
   * {
   *   "statusCode": 404,
   *   "message": "Country not found."
   * }
   */

  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a country by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
  @ApiResponse({
    status: 200,
    description: 'Country details',
    schema: {
      example: {
        statusCode: 200,
        message: 'Country retrieved successfully',
        data: {
          "id": "515189d3-5979-4892-a8c5-e37dab2477e9",
          "CountryCode": "IND",
          "Active": true,
          "SortSeq": 2,
          "CountryName": "INDIA" 
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Country not found',
      },
    },
  })
  async getCountry(@Param("id") id: string) {
      return this.countryService.country({ id: id });
  }

 /**
   * @summary Create a new country
   * @description Creates a new country with the provided details.
   * @url POST http://localhost:3000/country
   * @param body - Country data to be created
   * @returns {object} 201 - Successfully created country
   * @returns {object} 400 - Bad request due to invalid input data
   * @example request - Body
   * {
      "CountryCode": "Bangladesh",
      "Active": true,
      "SortSeq":4,
      "CountryName": "Bangladesh"   
    }
   * @example response - 201 - Country created
   * {
   *   "statusCode": 201,
   *   "message": "Country created successfully.",
   *   "data": 
   *      {  
   *        "id": "a145b5cb-a590-4e77-8231-e32b3d5483b5",
   *         "CountryCode": "Bangladesh",
   *         "Active": true,
   *         "SortSeq": 4,
   *         "CountryName": "Bangladesh" 
   *       }
   * }
   * @example response - 400 - Invalid input data
   * {
   *   "statusCode": 400,
   *   "message": "Invalid input data."
   * }
   */

   @Post()
   @ApiOperation({ summary: 'Create a new country' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({
    status: 201,
    description: 'Country created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Country created successfully',
        data: {
          "id": "a145b5cb-a590-4e77-8231-e32b3d5483b5",
            "CountryCode": "Bangladesh",
            "Active": true,
            "SortSeq": 4,
            "CountryName": "Bangladesh" 
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid input data',
      },
    },
  })  
   async signupUser(@Body() dto: CreateCountryDto) {
     return this.countryService.createCountry(dto);
   }

/**
   * @summary Update a country by its ID
   * @description Updates the details of an existing country identified by its ID.
   * @url PUT http://localhost:3000/country/{id}
   * @param id - The unique identifier of the country
   * @param body - Updated country data
   * @returns {object} 200 - Successfully updated country
   * @returns {object} 404 - Country not found with the provided ID
   * @example request - Body
   * {
      "CountryCode": "Bangladesh",
      "Active": true,
      "SortSeq":4,
      "CountryName": "Bangladesh"   
    }
   * @example response - 200 - Country updated
   * {
   *   "statusCode": 200,
   *   "message": "Country updated successfully.",
   *   "data": 
   *      {   
   *          "id": "a145b5cb-a590-4e77-8231-e32b3d5483b5",
   *         "CountryCode": "Bangladesh",
   *         "Active": true,
   *         "SortSeq": 4,
   *         "CountryName": "Bangladesh"  
   *      }
   * }
   * @example response - 404 - Country not found
   * {
   *   "statusCode": 404,
   *   "message": "Country not found."
   * }
   */

   @Put(":id")
   @ApiOperation({ summary: 'Update a country by ID' })
   @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
   @ApiBody({ type: UpdateCountryDto })
   @ApiResponse({
     status: 200,
     description: 'Country updated successfully',
     schema: {
       example: {
         statusCode: 200,
         message: 'Country updated successfully',
         data: 
          {
            "id": "a145b5cb-a590-4e77-8231-e32b3d5483b5",
            "CountryCode": "Bangladesh",
            "Active": true,
            "SortSeq": 4,
            "CountryName": "Bangladesh" 
         },
       },
     },
   })
   @ApiResponse({
     status: 404,
     description: 'Country not found',
     schema: {
       example: {
         statusCode: 404,
         message: 'Country not found',
       },
     },
   })
   async updateCountry(@Param('id') id: string,@Body() dto: CreateCountryDto) {
     return this.countryService.updateCountry(id, dto);
   }

    /**
   * @summary Delete a country by its ID
   * @description Deletes an existing country identified by its ID.
   * @url DELETE http://localhost:3000/country/{id}
   * @param id - The unique identifier of the country
   * @returns {object} 200 - Successfully deleted country
   * @returns {object} 404 - Country not found with the provided ID
   * @example response - 200 - Country deleted
   * {
   *   "statusCode": 200,
   *   "message": "Country successfully deleted."
   * }
   * @example response - 404 - Country not found
   * {
   *   "statusCode": 404,
   *   "message": "Country not found."
   * }
   */

   @Delete(":id")
   @ApiOperation({ summary: 'Delete a country by ID' })
   @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
   @ApiResponse({
     status: 200,
     description: 'Country deleted successfully',
     schema: {
       example: {
         statusCode: 200,
         message: 'Country deleted successfully',        
       },
     },
   })
   @ApiResponse({
     status: 404,
     description: 'Country not found',
     schema: {
       example: {
         statusCode: 404,
         message: 'Country not found',
       },
     },
   })
   async deleteCountry(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: CountryDto }> {      
     const response = await this.countryService.deleteCountry(id);
     return {
       statusCode: response.statusCode,
       message: response.message,
     };
    }
}
