import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Patch,
    ValidationPipe ,
    HttpException,
    HttpStatus,
  } from "@nestjs/common";
  import { UserService } from "../services/user.service";
  import { UpdateUserDto  } from '../dto/update-user.dto';
  import { CreateUserDto } from '../dto/create-user.dto';
  import { UserDto } from "../dto";
  import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam  } from '@nestjs/swagger';
  import { User } from '@prisma/client';
  
  @ApiTags('User')
  @Controller("user")
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
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
    async getUser(@Param("id") id: string): Promise<{ statusCode: number; message: string; data?: UserDto }>{
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
    // async signupUser(
    //   @Body() userData: { email: string, password: string, phone: string },
    // ): Promise<UserModel> {
    //   return this.userService.createUser(userData);
    // }
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
    // async updateUser(
    //   @Param("id") id: string,
    //   @Body() UserData: { email: string, password: string, phone: string },
    // ): Promise<UserModel> {
    //   return this.userService.updateUser(id, UserData);
    // }
    async updateUser(@Param('id') id: string,@Body() dto: CreateUserDto) {
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
    // async deleteUser(@Param('id') id: string,@Body() dto: CreateUserDto) {
    //   return this.userService.deleteUser(id, dto);
    // }
   

     /**
     * @summary Authenticate a user and return authentication token
     * @description Authenticates a user using their credentials and returns an authentication token.
     * @url [http://localhost:3000/user/login](http://localhost:3000/user/login)
     * @method POST
     * @requestBody
     * @param {CreateUserDto} loginData - The login credentials.
     * @returns {UserDto} The user object with authentication token.
     * @example
     * // Example request
     * POST http://localhost:3000/user/login
     * {
     *   "email": "Test@gmail.com",
     *   "password": "Test@123"
     * }
     * 
     * // Example response
     * {
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJleHBpcmVkX2JldGFnIjoiZGF0YSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     * }
     */

    @ApiTags('Login')
    @Post(':login')
    @ApiOperation({ summary: 'Authenticate a user and return authentication token' })
    @ApiBody({ type: CreateUserDto }) // Assuming login data is similar to user creation; adjust if necessary
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Login successful.',
        type: UserDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials.',
    })
    async login(@Body() body: { email: string; password: string }): Promise<{ status: number; message: string; data?: UserDto  }> {
      const { email, password } = body;
  
      // Call the UserLogin method from UserService
      const response = await this.userService.UserLogin(email, password);
  
      // Return the response from the service method
      return {
        status: response.status,
        message: response.message,
        data: response.data,
      };
    }

     /**
     * @summary Create a token for a user
     * @description Generates a token for a specified user using their unique ID.
     * @url [http://localhost:3000/user/token/{userid}](http://localhost:3000/user/token/{userid})
     * @method POST
     * @param {string} userid - The ID of the user for whom the token is created.
     * @returns {Object} The generated token.
     * @example
     * // Example request
     * POST http://localhost:3000/user/token/1
     * 
     * // Example response
     * {
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJleHBpcmVkX2JldGFnIjoiZGF0YSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
     * }
     */
    
  @ApiTags('token')
  @Post('token/:userid')
  @ApiOperation({ summary: 'Create a token for a user' })
  @ApiParam({
      name: 'userid',
      description: 'The unique identifier of the user',
      type: String,
  })
  @ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Token successfully created.',
      schema: {
          example: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJleHBpcmVkX2JldGFnIjoiZGF0YSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          },
      },
  })
  @ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Unable to create token.',
      schema: {
          example: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Unable to create token'
          },
      },
  })
  async createToken(@Param('userid') userid: string): Promise<{ token: string }> {
      try {
        const token = await this.userService.createToken(userid);
        return { token };
      } catch (e) {
        throw new HttpException(
          e.message || 'Unable to create token',
          e.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }