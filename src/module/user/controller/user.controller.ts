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
  import { User as UserModel } from "@prisma/client";
  import { UpdateUserDto  } from '../dto/update-user.dto';
  import { CreateUserDto, validateDto } from '../dto/create-user.dto';
  import { UserDto } from "../dto";
  import { ApiTags, ApiOperation, ApiResponse, ApiBody  } from '@nestjs/swagger';
  
  @ApiTags('User')
  @Controller("user")
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
  /**
     * @summary Retrieve a list of all users
     * @description Retrieves a list of all registered users in the system.
     * @url http://localhost:3000/user
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
    @ApiOperation({ summary: 'Get all users' })
    //@ApiResponse({ status: 200, description: 'List of all users', type: [UserDto] })
    async getAllUsers() {
      return this.userService.getAllUsers();
    }
  
     /**
     * @summary Retrieve a user by their ID
     * @description Retrieves the details of a user specified by their ID.
     * @url http://localhost:3000/user/{id}
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
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User details', type: UserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUser(@Param("id") id: string) {
      return this.userService.user({ id: id });
    }
  
      /**
     * @summary Create a new user
     * @description Creates a new user with the provided details.
     * @url http://localhost:3000/user
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
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async signupUser(
      @Body() userData: { email: string, password: string, phone: string },
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }

     /**
     * @summary Update user details by ID
     * @description Updates the details of an existing user specified by their ID.
     * @url http://localhost:3000/user/{id}
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
     *   "name": "Test"
     * }
     * 
     * // Example response
     * {
     *   "id": "1",
     *   "email": "Test@gmail.com",
     *   "name": "Test",
     *   "phone": "+0987654321"
     * }
     */
    @Put(":id")
    @ApiOperation({ summary: 'Update an existing user' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(
      @Param("id") id: string,
      @Body() UserData: { email: string, password: string, phone: string },
    ): Promise<UserModel> {
      return this.userService.updateUser(id, UserData);
    }

     /**
     * @summary Delete a user by their ID
     * @description Deletes a user specified by their ID.
     * @url http://localhost:3000/user/{id}
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
    @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param("id") id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: id });
    }

    /**
     * @summary Authenticate a user and return authentication token
     * @description Authenticates a user with provided credentials and returns an authentication token.
     * @url http://localhost:3000/user/login
     * @method POST
     * @requestBody
     * @param {CreateUserDto} body - The user's login credentials.
     * @returns {object} - Contains status, message, and optionally user data.
     * @example
     * // Example request
     * POST http://localhost:3000/user/login
     * {
     *   "email": "Test@gmail.com",
     *   "password": "securepassword"
     * }
     * 
     * // Example response
     * {
     *   "status": 200,
     *   "message": "Login successful",
     *   "data": {
     *     "id": "1",
     *     "email": "Test@gmail.com",
     *     "name": "Test",
     *     "phone": "+1234567890"
     *   }
     * }
     */
    @ApiOperation({ summary: 'Log in a user' })
    @ApiBody({ type: CreateUserDto }) // Adjust if needed; assuming login data is the same as user creation
    @ApiResponse({ status: 200, description: 'Successful login', type: UserDto })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  }