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

  @Get()
  @ApiOperation({ summary: 'Retrieve all countries' })
  @ApiResponse({ status: 200, description: 'List of all countries', type: [CountryDto] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a country by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
  @ApiResponse({ status: 200, description: 'Country details', type: CountryDto })
  @ApiResponse({ status: 404, description: 'Country not found' })
  async getCountry(@Param("id") id: string) {
      return this.countryService.country({ id: id });
  }

   @Post()
   @ApiOperation({ summary: 'Create a new country' })
   @ApiBody({ type: CreateCountryDto })
   @ApiResponse({ status: 201, description: 'Country created successfully', type: CountryDto })
   @ApiResponse({ status: 400, description: 'Invalid input data' })    
   async signupUser(@Body() dto: CreateCountryDto) {
     return this.countryService.createCountry(dto);
   }

   @Put(":id")
   @ApiOperation({ summary: 'Update a country by ID' })
   @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
   @ApiBody({ type: UpdateCountryDto })
   @ApiResponse({ status: 200, description: 'Country updated successfully', type: CountryDto })
   @ApiResponse({ status: 404, description: 'Country not found' })
   async updateCountry(@Param('id') id: string,@Body() dto: CreateCountryDto) {
     return this.countryService.updateCountry(id, dto);
   }

   @Delete(":id")
   @ApiOperation({ summary: 'Delete a country by ID' })
   @ApiParam({ name: 'id', description: 'The unique identifier of the country', type: String })
   @ApiResponse({ status: 200, description: 'Country deleted successfully', type: CountryDto })
   @ApiResponse({ status: 404, description: 'Country not found' })   
   async deleteCountry(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: CountryDto }> {      
     const response = await this.countryService.deleteCountry(id);
     return {
       statusCode: response.statusCode,
       message: response.message,
     };
    }
}
