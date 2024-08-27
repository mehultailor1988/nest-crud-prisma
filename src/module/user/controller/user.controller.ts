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
import { UserService } from "../services/user.service";
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from "../dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Token, User } from '@prisma/client';

@ApiTags('User')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
      * @summary Retrieve a list of all users
      * @description Retrieves a list of all registered users in the system.
      * @url [http://localhost:3000/user](http://localhost:3000/user)
      * @method GET
      * @returns {UserDto[]} An array of user objects.
      * @example
      * // Example request
      * GET http://localhost:3000/user
      * 
      * // Example response
      * [
      *   {
      *     "id": "1",
      *     "email": "Test@gmail.com",
      *     "name": "Test",
      *     "phone": "+1234567890"
      *   },
      *   ...
      * ]
      */

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all users retrieved successfully.',
    type: [UserDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Failed to retrieve users.',
  })
  async getAllUsers(): Promise<{ statusCode: number; message: string; data: UserDto[] }> {
    //return this.userService.getAllUsers();
    try {
      return await this.userService.getAllUsers();
    } catch (e) {
      throw new HttpException(
        e.message || 'Unable to retrieve users',
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  /**
   * @summary Retrieve a user by their ID
   * @description Retrieves the details of a user specified by their ID.
   * @url [http://localhost:3000/user/{id}](http://localhost:3000/user/{id})
   * @method GET
   * @param {string} id - The ID of the user to retrieve.
   * @returns {UserDto} The user object.
   * @example
   * // Example request
   * GET http://localhost:3000/user/1
   * 
   * // Example response
   * {
   *   "id": "1",
   *   "email": "Test@gmail.com",
   *   "name": "Test",
   *   "phone": "+1234567890"
   * }
   */
  @Get(":id")
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User details retrieved successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async getUser(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: UserDto }> {
    //return this.userService.user({ id: id });
    try {
      return await this.userService.user({ id });
    } catch (e) {
      throw new HttpException(
        e.message || 'Unable to retrieve user',
        e.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
     * @summary Create a new user
     * @description Creates a new user with the provided details.
     * @url [http://localhost:3000/user](http://localhost:3000/user)
     * @method POST
     * @requestBody
     * @param {CreateUserDto} userData - The details of the user to be created.
     * @returns {UserDto} The created user object.
     * @example
     * // Example request
     * POST http://localhost:3000/user
     * {
     *   "email": "Test@gmail.com",
     *   "password": "Test@123",
     *   "phone": "+1234567890",
     *   "name": "Test"
     * }
     * 
     * // Example response
     * {
     *   "id": "2",
     *   "email": "Test@gmail.com",
     *   "name": "Test",
     *   "phone": "+1234567890"
     * }
     */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async signupUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  /**
   * @summary Update user details by ID
   * @description Updates the details of an existing user specified by their ID.
   * @url [http://localhost:3000/user/{id}](http://localhost:3000/user/{id})
   * @method PUT
   * @param {string} id - The ID of the user to update.
   * @requestBody
   * @param {UpdateUserDto} userData - The details to update.
   * @returns {UserDto} The updated user object.
   * @example
   * // Example request
   * PUT http://localhost:3000/user/1
   * {
   *   "email": "Test@gmail.com",
   *   "password": "newpassword",
   *   "phone": "+0987654321",
   *   
   * }
   * 
   * // Example response
   * {
   *   "id": "1",
   *   "email": "Test@gmail.com",     *   
   *   "phone": "+0987654321"
   * }
   */
  @Put(":id")
  @ApiOperation({ summary: 'Update user details by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async updateUser(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  /**
   * @summary Delete a user by ID
   * @description Deletes a user specified by their ID.
   * @url [http://localhost:3000/user/{id}](http://localhost:3000/user/{id})
   * @method DELETE
   * @param {string} id - The ID of the user to delete.
   * @returns {UserDto} The deleted user object.
   * @example
   * // Example request
   * DELETE http://localhost:3000/user/1
   * 
   * // Example response
   * {
   *   "id": "1",
   *   "email": "Test@gmail.com",
   *   "name": "Test",
   *   "phone": "+1234567890"
   * }
   */
  @Delete(":id")
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  async deleteUser(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: UserDto }> {
    const response = await this.userService.deleteUser(id);
    return {
      statusCode: response.statusCode,
      message: response.message,
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ status: number; message: string; access_token: string }> {
    console.log("body -->", body);
    const { email, password } = body;

    const response = await this.userService.UserLogin(email, password);
    console.log("response", response);
    return {
      status: response.status,
      message: response.message,
      access_token: response.access_token,
    };
  }

  // @ApiTags('token')
  // @Post('token/:userid')
  // @ApiOperation({ summary: 'Create a token for a user' })
  // @ApiParam({
  //   name: 'userid',
  //   description: 'The unique identifier of the user',
  //   type: String,
  // })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'Token successfully created.',
  //   schema: {
  //     example: {
  //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJleHBpcmVkX2JldGFnIjoiZGF0YSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: 'Unable to create token.',
  //   schema: {
  //     example: {
  //       statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //       message: 'Unable to create token'
  //     },
  //   },
  // })
  // async createToken(@Param('userid') userid: string): Promise<{ token: string }> {
  //   try {
  //     const token = await this.userService.createToken(userid);
  //     return { token };
  //   } catch (e) {
  //     throw new HttpException(
  //       e.message || 'Unable to create token',
  //       e.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }


 /**
   * @summary Sign out user by deleting their token
   * @description Deletes the token associated with the specified user ID. This effectively signs out the user by invalidating their authentication token.
   * @param userid - The unique identifier of the user whose token will be deleted.
   * @returns An object indicating the success or failure of the token deletion.
   * @throws NotFoundException If the user is not found or the token deletion fails.
   * @example
   * // Example request
   * DELETE  http://localhost:3000/user/signout/7e6030ca-1322-4d7a-8807-5023c587250c
   * 
   * // Example response
   * {
   *   "statusCode": 200,
   *   "message": "Token successfully deleted."
   * }
   */

  @Delete("signout/:userid")
  @ApiOperation({ summary: 'Sign out user by deleting their token' })
  @ApiParam({
    name: 'userid',
    description: 'The unique identifier of the user whose token will be deleted',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token successfully deleted.',
    type: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZTYwMzBjYS0xMzIyLTRkN2EtODgwNy01MDIzYzU4NzI1MGMiLCJpYXQiOjE3MjQ3NTg5NjEsImV4cCI6MTcyNDg0NTM2MX0.e8ufygLP1d74XCP-UPPJLKqBOOqLzCtY3V7s-myom2I", // Adjust this if Token is not the expected response type
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found or token deletion failed.',
  })
  async deleteToken(@Param("userid") userid: string): Promise<{ statusCode: number; message: string; data?: Token }> {

    const response = await this.userService.deletetoken(userid);
    return {
      statusCode: response.statusCode,
      message: response.message,

    };
  }
}