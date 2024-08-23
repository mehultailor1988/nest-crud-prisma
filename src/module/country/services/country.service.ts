import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Country } from "@prisma/client";
import { CreateCountryDto, validateDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { CountryDto } from "../dto";
import { createCustomError } from "src/common/utils/helpers";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("Country service");

  async country(
    countryWhereUniqueInput: Prisma.CountryWhereUniqueInput,
  ): Promise<{statusCode: number; message: string; data?:Country }> {
    this.logger.log("countryById");
    try {
      const country = await this.prisma.country.findUnique({
        where: countryWhereUniqueInput,
      });
      if (!country) {
        throw createCustomError("Country not found", HttpStatus.NOT_FOUND);
      }
      console.log("country", typeof(country));
      
      //return plainToInstance(CountryDto, country);
      const countryDto = plainToInstance(CountryDto, country);
      return {
        statusCode: HttpStatus.OK,
        message: "User found successfully",
        data: countryDto,
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCountry() : Promise<{statusCode: number; message: string; data:CountryDto[] }>{
    this.logger.log("getAllCountry");
    try {
      const country = await this.prisma.country.findMany();
      // return plainToInstance(CountryDto, country);
      const countryData = plainToInstance(CountryDto, country);
      return {
        statusCode: HttpStatus.OK,
        message: "User found successfully",
        data: countryData,
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  // async createCountry(dto: CreateCountryDto): Promise<Country> {
  //   try {
  //     // Validate the DTO
  //     await validateDto(dto);

  //     // Create the country
  //     const createCountry = await this.prisma.country.create({
  //       data: {
        
  //         CountryCode: dto.CountryCode,
  //         CountryName: dto.CountryName,
  //         Active: dto.Active,
  //         SortSeq: dto.SortSeq,
         
  //       },
  //     });

  //     console.log("country created:", createCountry);
  //     return createCountry;
  //   } catch (e) {
  //     console.log("ERROR", e);

  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async createCountry(dto: CreateCountryDto): Promise<{ statusCode: number; message: string; data: Country | null }> {
    try {
      // Validate the DTO
      await validateDto(dto);

     

      // Create the user
      const createCountry = await this.prisma.country.create({        
        data: {
        
          CountryCode: dto.CountryCode,
          CountryName: dto.CountryName,
          Active: dto.Active,
          SortSeq: dto.SortSeq,         
        },
      });

      console.log("User created:", createCountry);
      //return createUser;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Country successfully created',
        data: createCountry,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  // async updateCountry(params: {
  //   where: Prisma.CountryWhereUniqueInput;
  //   data: Prisma.CountryUpdateInput;
  // }): Promise<Country> {
  //   this.logger.log("updateCountry");
  //   try {
  //     const updateCountry = await this.prisma.country.update({
  //       where: params.where,
  //       data: params.data,
  //     });
  //     return updateCountry;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }


  
  // async updateCountry(id : string,dto: CreateCountryDto): Promise<Country> {
  //   try {
  //     // Validate the DTO
  //     await validateDto(dto);

  //     // Create the user
  //     const updateCountry = await this.prisma.country.update({
  //       where: { id },
  //       data: {
        
  //         CountryCode: dto.CountryCode,
  //         CountryName: dto.CountryName,
  //         Active: dto.Active,
  //         SortSeq: dto.SortSeq,
         
  //       },
  //     });

  //     console.log("User created:", updateCountry);
  //     return updateCountry;
  //   } catch (e) {
  //     console.log("ERROR", e);

  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  
  async updateCountry(id : string,dto: CreateCountryDto): Promise<{ statusCode: number; message: string; data: Country | null}> {
    try {
      // Validate the DTO
      await validateDto(dto);

    
      // Update the Country
      const updateCountry = await this.prisma.country.update({
        where: { id },
        data: {
          CountryCode: dto.CountryCode,
          CountryName: dto.CountryName,
          Active: dto.Active,
          SortSeq: dto.SortSeq,
         
        },
      });

      console.log("Country created:", updateCountry);
      //return createUser;
      return {
        statusCode: HttpStatus.OK,
        message: 'Country successfully updated',
        data: updateCountry,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  

  // async deleteCountry(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
  //   this.logger.log("deleteCountry");
  //   try {
  //     const deleteCountry = await this.prisma.country.delete({
  //       where,
  //     });
  //     return deleteCountry;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //  }

  async deleteCountry(id : string): Promise<{statusCode: number; message: string; data: Country | null }> {
    try {
      const deleteCountry = await this.prisma.country.delete({
        where : { id },
      });
      return {
        data: deleteCountry,
        statusCode: HttpStatus.OK, // Successful deletion
        message: "Country successfully deleted.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }

}
