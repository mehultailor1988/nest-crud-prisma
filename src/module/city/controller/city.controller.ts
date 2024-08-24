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
import { CityService } from "../services/city.service";
import { City, City as CityModel } from "@prisma/client";
import { CityDto, CreateCityDto, UpdateCityDto } from "../dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

 /**
   * @summary Retrieve all cities
   * @description Get a list of all cities in the database.
   * @url GET /city
   * @returns {object} 200 - Successfully retrieved list of cities
   * @returns {object} 500 - Internal server error
   * @example response - 200
   * {
   *   "statusCode": 200,
   *   "message": "Cities retrieved successfully.",
   *   "data": [
   *     {
            "id": "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
            "CityName": "Surat",
            "StateCode": "Guj",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
        },
        {
            "id": "5ada5c05-b07f-41a0-b11c-714b3a1c48c1",
            "CityName": "AHMEDABAD",
            "StateCode": "GUJ",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2
        }
   *   ]
   * }
   * @example response - 500
   * {
   *   "statusCode": 500,
   *   "message": "Unable to retrieve cities."
   * }
   */

  @Get()
  @ApiOperation({ summary: 'Retrieve all cities' })
  @ApiResponse({
    status: 200,
    description: 'List of all cities',
    schema: {
      example: {
      data: [
          {
            "id": "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
            "CityName": "Surat",
            "StateCode": "Guj",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
          },
          {
            "id": "5ada5c05-b07f-41a0-b11c-714b3a1c48c1",
            "CityName": "AHMEDABAD",
            "StateCode": "GUJ",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2
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
  async getAllCity() : Promise<{ statusCode: number; message: string; data: CityDto[] }> {
    try {
    return await this.cityService.getAllCity();
  } catch (e) {
    throw new HttpException(
      e.message || 'Unable to retrieve city',
      e.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

  /**
   * @summary Retrieve a city by ID
   * @description Fetch a city by its unique ID.
   * @url GET /city/:id
   * @param id path string - The unique identifier of the city
   * @returns {object} 200 - Successfully retrieved city
   * @returns {object} 404 - City not found
   * @returns {object} 500 - Internal server error
   * @example response - 200
   * {
   *   "statusCode": 200,
   *   "message": "City retrieved successfully",
   *   "data": {
   *     "id": "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
   *     "CityName": "Surat",
   *     "StateCode": "Guj",
   *     "CountryCode": "IND",
   *     "Active": true,
   *     "SortSeq": 1
   *   }
   * }
   * @example response - 404
   * {
   *   "statusCode": 404,
   *   "message": "City not found"
   * }
   * @example response - 500
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error"
   * }
   */

  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a city by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the city', type: String })
  @ApiResponse({
    status: 200,
    description: 'City details',
    schema: {
      example: {
        statusCode: 200,
        message: 'City retrieved successfully',
        data: {
          id: "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
          CityName: "Surat",
          StateCode: "Guj",
          CountryCode: "IND",
          Active: true,
          SortSeq: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'City not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'City not found',
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
  async getUser(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: CityDto }> {
    try {
    return await this.cityService.city({ id });
  } catch (e) {
    throw new HttpException(
      e.message || 'Unable to retrieve city',
      e.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

 /**
   * @summary Create a new city
   * @description Add a new city to the database.
   * @url POST /city
   * @param body body CreateCityDto - The data for the new city
   * @returns {object} 201 - Successfully created city
   * @returns {object} 400 - Invalid input data
   * @returns {object} 500 - Internal server error
   * @example request - Body
   * {
       "CityName": "Surat",
      "StateCode": "GUJ",   
      "CountryCode": "IND",
      "Active": true,
      "SortSeq":1   
    }
   * @example response - 201
   * {
   *   "statusCode": 201,
   *   "message": "City created successfully",
   *   "data": {
   *     "id": "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
   *     "CityName": "Surat",
   *     "StateCode": "Guj",
   *     "CountryCode": "IND",
   *     "Active": true,
   *     "SortSeq": 1
   *   }
   * }
   * @example response - 400
   * {
   *   "statusCode": 400,
   *   "message": "Invalid input data"
   * }
   * @example response - 500
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error"
   * }
   */

  @Post()   
  @ApiOperation({ summary: 'Create a new city' })
  @ApiBody({ type: CreateCityDto })
  @ApiResponse({
    status: 201,
    description: 'City created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'City created successfully',
        data: {
          id: "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
          CityName: "Surat",
          StateCode: "Guj",
          CountryCode: "IND",
          Active: true,
          SortSeq: 1,
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
    async signupUser(@Body() dto: CreateCityDto) {
      return this.cityService.createCity(dto);
    }

     /**
   * @summary Update a city by ID
   * @description Modify an existing city using its unique ID.
   * @url PUT /city/:id
   * @param id path string - The unique identifier of the city
   * @param body body UpdateCityDto - The updated data for the city
   * @returns {object} 200 - Successfully updated city
   * @returns {object} 404 - City not found
   * @returns {object} 400 - Invalid input data
   * @returns {object} 500 - Internal server error
   * @example request - Body
   * {
      "CityName": "Surat",
      "StateCode": "GUJ",   
      "CountryCode": "IND",
      "Active": true,
      "SortSeq":1   
    }
   * @example response - 200
   * {
   *   "statusCode": 200,
   *   "message": "City updated successfully",
   *   "data": {
   *     "id": "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
   *     "CityName": "Surat",
   *     "StateCode": "Guj",
   *     "CountryCode": "IND",
   *     "Active": true,
   *     "SortSeq": 1
   *   }
   * }
   * @example response - 404
   * {
   *   "statusCode": 404,
   *   "message": "City not found"
   * }
   * @example response - 400
   * {
   *   "statusCode": 400,
   *   "message": "Invalid input data"
   * }
   * @example response - 500
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error"
   * }
   */

    @Put(":id")   
    @ApiOperation({ summary: 'Update a city by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the city', type: String })
    @ApiBody({ type: CreateCityDto })
    @ApiResponse({
      status: 200,
      description: 'City updated successfully',
      schema: {
        example: {
          statusCode: 200,
          message: 'City updated successfully',
          data: {
            id: "7d486b29-0ba7-4d3f-9dc1-b113dbf2a9e9",
            CityName: "Surat",
            StateCode: "Guj",
            CountryCode: "IND",
            Active: true,
            SortSeq: 1,
          },
        },
      },
    })
    @ApiResponse({
      status: 404,
      description: 'City not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'City not found',
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
    async updateCity(@Param('id') id: string,@Body() dto: CreateCityDto) {
      return this.cityService.updateCity(id, dto);
    }

/**
   * @summary Delete a city by ID
   * @description Remove a city using its unique ID.
   * @url DELETE /city/:id
   * @param id path string - The unique identifier of the city
   * @returns {object} 200 - Successfully deleted city
   * @returns {object} 404 - City not found
   * @returns {object} 500 - Internal server error
   * @example response - 200
   * {
   *   "statusCode": 200,
   *   "message": "City deleted successfully"
   * }
   * @example response - 404
   * {
   *   "statusCode": 404,
   *   "message": "City not found"
   * }
   * @example response - 500
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error"
   * }
   */

     @Delete(":id")  
     @ApiOperation({ summary: 'Delete a city by ID' })
     @ApiParam({ name: 'id', description: 'The unique identifier of the city', type: String })
     @ApiResponse({
       status: 200,
       description: 'City deleted successfully',
       schema: {
         example: {
           statusCode: 200,
           message: 'City deleted successfully',
         },
       },
     })
     @ApiResponse({
       status: 404,
       description: 'City not found',
       schema: {
         example: {
           statusCode: 404,
           message: 'City not found',
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
    async deleteCity(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: City }> {      
      const response = await this.cityService.deleteCity(id);
      return {
        statusCode: response.statusCode,
        message: response.message,

      };
     }
}
