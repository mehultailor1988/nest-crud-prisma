import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Country } from "@prisma/client";
import { CreateCountryDto } from '../dto/create-country.dto';
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
  ): Promise<Country | null> {
    this.logger.log("countryById");
    try {
      const country = await this.prisma.country.findUnique({
        where: countryWhereUniqueInput,
      });
      if (!country) {
        throw createCustomError("Country not found", HttpStatus.NOT_FOUND);
      }
      console.log("country", typeof(country));
      
      return plainToInstance(CountryDto, country);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCountry() {
    this.logger.log("getAllCountry");
    try {
      const country = await this.prisma.country.findMany();
      return plainToInstance(CountryDto, country);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  async createCountry(data: Prisma.CountryCreateInput): Promise<Country> {
    this.logger.log("createCountry");
    try {
      const createCountry = await this.prisma.country.create({
        data,
      });
      console.log("createCountry", createCountry);
      
      return createCountry;
    } catch (e) {
      console.log("ERROR", e);
      
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  async updateCountry(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    this.logger.log("updateCountry");
    try {
      const updateCountry = await this.prisma.country.update({
        where: params.where,
        data: params.data,
      });
      return updateCountry;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  

  async deleteCountry(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    this.logger.log("deleteCountry");
    try {
      const deleteCountry = await this.prisma.country.delete({
        where,
      });
      return deleteCountry;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }

  // create(createCountryDto: CreateCountryDto) {
  //   return 'This action adds a new country';
  // }

  // findAll() {
  //   return `This action returns all country`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} country`;
  // }

  // update(id: number, updateCountryDto: UpdateCountryDto) {
  //   return `This action updates a #${id} country`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} country`;
  // }
}
