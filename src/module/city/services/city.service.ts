import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, City } from "@prisma/client";
import { CityDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { createCustomError } from "src/common/utils/helpers";
import { CreateCityDto, validateDto } from '../dto/create-city.dto';


@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("City service");

  async city(
    CityWhereUniqueInput: Prisma.CityWhereUniqueInput,
  ): Promise<{ statusCode: number; message: string; data?: CityDto}> {
    this.logger.log("userById");
    try {
      const city = await this.prisma.city.findUnique({
        where: CityWhereUniqueInput,
      });
      if (!city) {
        throw createCustomError("City not found", HttpStatus.NOT_FOUND);
      }
      const citydata = plainToInstance(CityDto, city);
      return {
        statusCode: HttpStatus.OK,
        message: "City found successfully",
        data: citydata,
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async getAllCity() : Promise<{ statusCode: number; message: string; data: CityDto[] }>{
    this.logger.log("getAllCity");
    try {
      const city = await this.prisma.city.findMany();
      //return plainToInstance(CityDto, city);
      const citydata = plainToInstance(CityDto, city);
      return {
        statusCode: HttpStatus.OK,
        message: "City retrieved successfully",
        data: citydata,
      };      
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async createCity(dto: CreateCityDto): Promise<{ statusCode: number; message: string; data:City}> {
    try {
      // Validate the DTO
      await validateDto(dto);

      // Create the City
      const createcity = await this.prisma.city.create({
        data: {
        
          CityName: dto.CityName,
          StateCode: dto.StateCode,
          CountryCode: dto.CountryCode,
          Active: dto.Active,
          SortSeq: dto.SortSeq,
         
        },
      });

      console.log("City created:", createcity);
      //return createcity;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'City created successfully.',
        data: createcity,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async updateCity(id : string,dto: CreateCityDto): Promise<{ statusCode: number; message: string; data:City}> {
    try {
      // Validate the DTO
      await validateDto(dto);

      // Update the City
      const Upadtecity = await this.prisma.city.update({
        where: { id },
        data: {
        
          CityName: dto.CityName,
          StateCode: dto.StateCode,
          CountryCode: dto.CountryCode,
          Active: dto.Active,
          SortSeq: dto.SortSeq,
         
        },
      });

      console.log("Update City:", Upadtecity);
      //return Upadtecity;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'City updated successfully.',
        data: Upadtecity,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
    

  async deleteCity(id : string): Promise<{ statusCode: number; message: string; data?:City;}> {
    this.logger.log("deleteUser");
    try {
      const deleteCity = await this.prisma.city.delete({
        where: { id },
      });
      //return deleteCity;
      return {
        data: deleteCity,
        statusCode: HttpStatus.OK, 
        message: "City deleted successfully.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
}
