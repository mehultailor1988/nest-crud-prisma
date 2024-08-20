import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { StateService } from '../services/state.service';
import { State as StateModel } from "@prisma/client";

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllState() {
    return this.stateService.getAllState();
  }

  @Get(":id")
  async getState(@Param("id") id: string) {
    return this.stateService.state({ id: id });
  }

  @Post()
  async signupState(
    @Body() stateData: { StateCode: string, StateName: string, CountryCode: string, Active: boolean, SortSeq: number },
  ): Promise<StateModel> {
    return this.stateService.createState(stateData);
  }

  @Put(":id")
    async updateState(
      @Param("id") id: string,
      @Body() StateData: { StateCode: string, StateName: string, CountryCode: string, Active: boolean, SortSeq: number },
    ): Promise<StateModel> {
      return this.stateService.updateState(id, StateData,);
    }

    @Delete(":id")
    async deleteCountry(@Param("id") id: string): Promise<StateModel> {
      return this.stateService.deleteState({ id: id });
    }
}
