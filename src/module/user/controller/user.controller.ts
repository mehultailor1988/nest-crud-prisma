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
  } from "@nestjs/common";
  import { UserService } from "../services/user.service";
  import { User as UserModel } from "@prisma/client";
  import { UpdateUserDto  } from '../dto/update-user.dto';
  import { CreateUserDto, validateDto } from '../dto/create-user.dto';
  
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
    async signupUser(
      @Body() userData: { email: string; name: string },
    ): Promise<UserModel> {
      return this.userService.createUser(userData);
    }
  
    @Put(":id")
    async updateUser(
      @Param("id") id: string,
      @Body() UserData: { email: string, name: string },
    ): Promise<UserModel> {
      return this.userService.updateUser(id, UserData);
    }

  
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: id });
    }
  }