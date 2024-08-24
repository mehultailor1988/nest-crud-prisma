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
import { StateService } from '../services/state.service';
import { State as StateModel } from "@prisma/client";
import {  StateDto } from "../dto";
import {CreateStatetDto} from "../dto/create-state.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

/**
   * @summary Retrieve all states
   * @description Retrieves a list of all states with their details.
   * @url GET  http://localhost:3000/state
   * @returns {object} 200 - Successfully retrieved the list of all states
   * @returns {object} 500 - Internal server error occurred
   * @example response - 200 - List of all states
   * {
   *   "statusCode": 200,
   *   "message": "State found successfully",
   *   "data": [
   *      {
   *       "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
            "StateCode": "GUJ",
            "StateName": "GUJARAT",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
          }
   *   ]
   * }
   * @example response - 500 - Internal server error
   * {
   *   "statusCode": 500,
   *   "message": "Internal server error."
   * }
   */

  @Get()
  @ApiOperation({ summary: 'Retrieve all states' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of all states',
    schema: {
      example: {
        statusCode: 200,
        message: 'State found successfully.',
        data: [
          {
            "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
            "StateCode": "GUJ",
            "StateName": "GUJARAT",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
          },
          {
            "id": "a1ae88eb-4498-47e8-aec0-2a8eb3e89506",
            "StateCode": "BHR",
            "StateName": "Bihar",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 2
          },
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
        message: 'Internal server error.',
      },
    },
  })
  async getAllState() : Promise<{ statusCode: number; message: string; data: StateDto[] }>{
    try {
    return await this.stateService.getAllState();
  } catch (e) {
    throw new HttpException(
      e.message || 'Unable to retrieve users',
      e.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

 /**
   * @summary Retrieve a specific state by its ID
   * @description Retrieves details of a specific state identified by its ID.
   * @url GET http://localhost:3000/state/{id}
   * @param id - The unique identifier of the state
   * @returns {object} 200 - Successfully retrieved the state details
   * @returns {object} 404 - State not found with the provided ID
   * @example response - 200 - State details
   * {
   *   "statusCode": 200,
   *   "message": "State found successfully",
   *   "data": 
   *      {   
   *       "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
           "StateCode": "GUJ",
           "StateName": "GUJARAT",
           "CountryCode": "IND",
           "Active": true,
           "SortSeq": 1 
          }
   * }
   * @example response - 404 - State not found
   * {
   *   "statusCode": 404,
   *   "message": "State not found."
   * }
   */

  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a state by its ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the state', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the state details',
    schema: {
      example: {
        statusCode: 200,
        message: 'State found successfully.',
        data: {  
                "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
                "StateCode": "GUJ",
                "StateName": "GUJARAT",
                "CountryCode": "IND",
                "Active": true,
                "SortSeq": 1 
              },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'State not found with the provided ID',
    schema: {
      example: {
        statusCode: 404,
        message: 'State not found.',
      },
    },
  })
  async getState(@Param("id") id: string) : Promise<{ statusCode: number; message: string; data?: StateDto }> {
    try {
    return await this.stateService.state({id});
  } catch (e) {
    throw new HttpException(
      e.message || 'Unable to retrieve user',
      e.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

   /**
   * @summary Create a new state
   * @description Creates a new state with the provided details.
   * @url POST http://localhost:3000/state
   * @param body - State data to be created
   * @returns {object} 201 - Successfully created state
   * @returns {object} 400 - Bad request due to invalid input data
   * @example request - Body
   * {
      "StateCode": "GUJ",
      "StateName": "GUJARAT",   
      "CountryCode": "IND",
      "Active": true,
      "SortSeq":1
      }
   * @example response - 201 - State created
   * {
   *  "statusCode": 200,
      "message": "state created successfully",
      "data": 
          {
            "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
            "StateCode": "GUJ",
            "StateName": "GUJARAT",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
          }
   * }
   * @example response - 400 - Invalid input data
   * {
   *   "statusCode": 400,
   *   "message": "Invalid input data."
   * }
   */

  @Post() 
  @ApiOperation({ summary: 'Create a new state' })
  @ApiBody({ type: CreateStatetDto })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the state',
    schema: {
      example: {
        statusCode: 201,
        message: 'State created successfully.',
        data: { 
                "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
                "StateCode": "GUJ",
                "StateName": "GUJARAT",
                "CountryCode": "IND",
                "Active": true,
                "SortSeq": 1 
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
        message: 'Invalid input data.',
      },
    },
  })
  async signupUser(@Body() dto: StateDto) {
    return this.stateService.createState(dto);
  }

 /**
   * @summary Update a state by its ID
   * @description Updates the details of an existing state identified by its ID.
   * @url PUT http://localhost:3000/state/{id}
   * @param id - The unique identifier of the state
   * @param body - Updated state data
   * @returns {object} 200 - Successfully updated state
   * @returns {object} 404 - State not found with the provided ID
   * @example request - Body
   * {
   *  "statusCode": 200,
      "message": "State found successfully",
      "data": 
          {
            "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
            "StateCode": "GUJ",
            "StateName": "GUJARAT",
            "CountryCode": "IND",
            "Active": true,
            "SortSeq": 1
          }
   * }
   * }
   * @example response - 200 - State updated
   * {
   *   "statusCode": 200,
   *   "message": "State updated successfully.",
   *   "data": { "id": "1", "name": "UpdatedStateName", "code": "USN" }
   * }
   * @example response - 404 - State not found
   * {
   *   "statusCode": 404,
   *   "message": "State not found."
   * }
   */

  @Put(":id") 
  @ApiOperation({ summary: 'Update a state by its ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the state', type: String })
  @ApiBody({ type: CreateStatetDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the state',
    schema: {
      example: {
        statusCode: 200,
        message: 'State updated successfully.',
        data: {  
                "id": "3dbd9bbc-0277-4cbe-a3ad-53f76db820d5",
                "StateCode": "GUJ",
                "StateName": "GUJARAT",
                "CountryCode": "IND",
                "Active": true,
                "SortSeq": 1 
              },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'State not found with the provided ID',
    schema: {
      example: {
        statusCode: 404,
        message: 'State not found.',
      },
    },
  })   
    async updateUser(@Param('id') id: string,@Body() dto: StateDto) {
      return this.stateService.updateState(id, dto);
    }

 /**
   * @summary Delete a state by its ID
   * @description Deletes an existing state identified by its ID.
   * @url DELETE http://localhost:3000/state/{id}
   * @param id - The unique identifier of the state
   * @returns {object} 200 - Successfully deleted state
   * @returns {object} 404 - State not found with the provided ID
   * @example response - 200 - State deleted
   * {
   *   "statusCode": 200,
   *   "message": "State deleted successfully."
   * }
   * @example response - 404 - State not found
   * {
   *   "statusCode": 404,
   *   "message": "State not found."
   * }
   */

  @Delete(":id")
   @ApiOperation({ summary: 'Delete a state by its ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the state', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the state',
    schema: {
      example: {
        statusCode: 200,
        message: 'State deleted successfully.',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'State not found with the provided ID',
    schema: {
      example: {
        statusCode: 404,
        message: 'State not found.',
      },
    },
  })
    async deleteState(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: StateDto }> {      
      const response = await this.stateService.deleteState(id);
      return {
        statusCode: response.statusCode,
        message: response.message,

      };
     }
}
