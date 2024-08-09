import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UserDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { createCustomError } from "src/common/utils/helpers";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger("User service");

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.log("userById");
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      if (!user) {
        throw createCustomError("User not found", HttpStatus.NOT_FOUND);
      }
      return plainToInstance(UserDto, user);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getAllUsers() {
    this.logger.log("getAllUsers");
    try {
      const users = await this.prisma.user.findMany();
      return plainToInstance(UserDto, users);
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    this.logger.log("createUser");
    try {
      const createUser = await this.prisma.user.create({
        data,
      });
      console.log("createUser", createUser);
      
      return createUser;
    } catch (e) {
      console.log("ERROR", e);
      
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log("updateUser");
    try {
      const updateUser = await this.prisma.user.update({
        where: params.where,
        data: params.data,
      });
      return updateUser;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log("deleteUser");
    try {
      const deleteUser = await this.prisma.user.delete({
        where,
      });
      return deleteUser;
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}