import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, City } from "@prisma/client";
import { CityDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { createCustomError } from "src/common/utils/helpers";


@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("City service");

  async city(
    CityWhereUniqueInput: Prisma.CityWhereUniqueInput,
  ): Promise<City | null> {
    this.logger.log("userById");
    try {
      const city = await this.prisma.city.findUnique({
        where: CityWhereUniqueInput,
      });
      if (!city) {
        throw createCustomError("City not found", HttpStatus.NOT_FOUND);
      }
      return plainToInstance(CityDto, city);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async getAllCity() {
    this.logger.log("getAllCity");
    try {
      const city = await this.prisma.city.findMany();
      return plainToInstance(CityDto, city);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  
  async createCity(data: Prisma.CityCreateInput): Promise<City> {
    this.logger.log("createCity");
    try {
      const createCity = await this.prisma.city.create({
        data,
      });
      console.log("createCity", createCity);
      
      return createCity;
    } catch (e) {
      console.log("ERROR", e);
      
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async updateCity(params: {
    where: Prisma.CityWhereUniqueInput;
    data: Prisma.CityUpdateInput;
  }): Promise<City> {
    this.logger.log("updateCity");
    try {
      const updateCity = await this.prisma.city.update({
        where: params.where,
        data: params.data,
      });
      return updateCity;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteCity(where: Prisma.CityWhereUniqueInput): Promise<City> {
    this.logger.log("deleteUser");
    try {
      const deleteCity = await this.prisma.city.delete({
        where,
      });
      return deleteCity;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  
}
