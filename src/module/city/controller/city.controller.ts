import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CityService } from "../services/city.service";
import { City as CityModel } from "@prisma/client";


@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getAllCity() {
    return this.cityService.getAllCity();
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.cityService.city({ id: id });
  }

  @Post()
    async signupUser(
      @Body() CityData: { CityName: string; StateCode: string; CountryCode: string; Active: boolean; SortSeq: number },
    ): Promise<CityModel> {
      return this.cityService.createCity(CityData);
    }

    @Put(":id")
    async updateUser(
      @Param("id") id: string,
      @Body() CityData: { CityName: string; StateCode: string; CountryCode: string; Active: boolean; SortSeq: number  },
    ): Promise<CityModel> {
      return this.cityService.updateCity(id, CityData);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<CityModel> {
      return this.cityService.deleteCity({ id: id });
    }
}
