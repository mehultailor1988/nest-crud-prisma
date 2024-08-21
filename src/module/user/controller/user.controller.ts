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
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @Controller("user")
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    async getAllUsers() {
      return this.userService.getAllUsers();
    }
  
    @Get(":id")
    async getUser(@Param("id") id: string) {
      return this.userService.user({ id: id });
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    async signupUser(
      @Body() userData: { email: string, password: string, phone: string, name: string },
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }

    @Put(":id")
    async updateUser(
      @Param("id") id: string,
      @Body() UserData: { email: string, password: string, phone: string, name: string  },
    ): Promise<UserModel> {
      return this.userService.updateUser(id, UserData);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: id });
    }

    @Post('login')
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