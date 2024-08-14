import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, State } from "@prisma/client";
import { StateDto } from "../dto";
import { createCustomError } from "src/common/utils/helpers";
import { plainToInstance } from "class-transformer";
// import { State } from "../entities/state.entity";

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("State service");
  
  async state(
    StateWhereUniqueInput: Prisma.StateWhereUniqueInput,
  ): Promise<State | null> {
    this.logger.log("stateById");
    try {
      const state = await this.prisma.state.findUnique({
        where: StateWhereUniqueInput,
      });
      if (!state) {
        throw createCustomError("State not found", HttpStatus.NOT_FOUND);
      }     
      return plainToInstance(StateDto, state);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllState() {
    this.logger.log("getAllCountry");
    try {
      const state = await this.prisma.state.findMany();
      return plainToInstance(StateDto, state);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  async createState(data: Prisma.StateCreateInput): Promise<State> {
    this.logger.log("createstate");
    try {
      const createstate = await this.prisma.state.create({
        data,
      });
      
      return createstate;
    } catch (e) {
      console.log("ERROR", e);
      
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  async updateState(params: {
    where: Prisma.StateWhereUniqueInput;
    data: Prisma.StateUpdateInput;
  }): Promise<State> {
    this.logger.log("updateSate");
    try {
      const updateState = await this.prisma.state.update({
        where: params.where,
        data: params.data,
      });
      return updateState;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  
  async deleteState(where: Prisma.StateWhereUniqueInput): Promise<State> {
    this.logger.log("deleteState");
    try {
      const deleteState = await this.prisma.state.delete({
        where,
      });
      return deleteState;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }

  // create(createStateDto: CreateStateDto) {
  //   return 'This action adds a new state';
  // }

  // findAll() {
  //   return `This action returns all state`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} state`;
  // }

  // update(id: number, updateStateDto: UpdateStateDto) {
  //   return `This action updates a #${id} state`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} state`;
  // }
}
