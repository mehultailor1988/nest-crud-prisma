import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, State } from "@prisma/client";
import { StateDto } from "../dto";
import { createCustomError } from "src/common/utils/helpers";
import { plainToInstance } from "class-transformer";
// import { State } from "../entities/state.entity";
import { CreateStatetDto, validateDto } from '../dto/create-state.dto';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("State service");
  
  async state(
    StateWhereUniqueInput: Prisma.StateWhereUniqueInput,
  ): Promise<{ statusCode: number; message: string; data?: StateDto}> {
    this.logger.log("stateById");
    try {
      const state = await this.prisma.state.findUnique({
        where: StateWhereUniqueInput,
      });
      if (!state) {
        throw createCustomError("State not found", HttpStatus.NOT_FOUND);
      }     
     // return plainToInstance(StateDto, state);
     const DataState = plainToInstance(StateDto, state);
     return {
      statusCode: HttpStatus.OK,
      message: "State found successfully",
      data: DataState, 
    };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllState() : Promise<{ statusCode: number; message: string; data: StateDto[] }> {
    this.logger.log("getAllCountry");
    try {
      const state = await this.prisma.state.findMany();
     // return plainToInstance(StateDto, state);
     const DataState = plainToInstance(StateDto, state);
     return {
      statusCode: HttpStatus.OK,
      message: "State found successfully",
      data: DataState, 
    };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  // async createState(data: Prisma.StateCreateInput): Promise<State> {
  //   this.logger.log("createstate");
  //   try {
  //     const createstate = await this.prisma.state.create({
  //       data,
  //     });
      
  //     return createstate;
  //   } catch (e) {
  //     console.log("ERROR", e);
      
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async createState(dto: CreateStatetDto): Promise<{ statusCode: number; message: string; data:State | null }> {
    try {
      // Validate the DTO
      await validateDto(dto);

      // Create the state
      const createstate = await this.prisma.state.create({
        data: {
        
          StateCode: dto.StateCode,
          StateName: dto.StateName,
          CountryCode: dto.CountryCode,
          Active: dto.Active,
          SortSeq: dto.SortSeq,
         
        },
      });

      console.log("state created:", createstate);
      //return createstate;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'state created successfully',
        data: createstate,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  // async updateState(params: {
  //   where: Prisma.StateWhereUniqueInput;
  //   data: Prisma.StateUpdateInput;
  // }): Promise<State> {
  //   this.logger.log("updateSate");
  //   try {
  //     const updateState = await this.prisma.state.update({
  //       where: params.where,
  //       data: params.data,
  //     });
  //     return updateState;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  
  
  async updateState(id : string,dto: CreateStatetDto): Promise<{ statusCode: number; message: string; data:State | null }> {
    try {
      // Validate the DTO
      await validateDto(dto);

      // Update the state
      const Upadtestate = await this.prisma.state.update({
        where: { id },
        data: {
        
          StateCode: dto.StateCode,
          StateName: dto.StateName,
          CountryCode: dto.CountryCode,
          Active: dto.Active,
          SortSeq: dto.SortSeq,
         
        },
      });

      console.log("Update State:", Upadtestate);
      //return Upadtestate;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'state updated successfully',
        data: Upadtestate,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  
  async deleteState(id : string): Promise<{ statusCode: number; message: string; data:State | null }> {
    this.logger.log("deleteState");
    try {
      const deleteState = await this.prisma.state.delete({
        where : { id },
      });
      //return deleteState;
      return {
        data: deleteState,
        statusCode: HttpStatus.OK, 
        message: "State deleted successfully.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }
}
