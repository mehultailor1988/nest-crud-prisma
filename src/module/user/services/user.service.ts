import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, User, Token } from "@prisma/client";
import { UserDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { createCustomError } from "src/common/utils/helpers";
import { CreateUserDto, validateDto } from '../dto/create-user.dto';


import * as bcrypt from 'bcrypt'; // Import bcrypt
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService, 
    private jwtService: JwtService,
  ) {}

  private logger = new Logger("User service");

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ statusCode: number; message: string; data?: UserDto}> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      if (!user) {
        throw createCustomError("User not found", HttpStatus.NOT_FOUND);
      }
      //return plainToInstance(UserDto, user);
      const userDto = plainToInstance(UserDto, user);
      return {
        statusCode: HttpStatus.OK,
        message: "User found successfully",
        data: userDto, // Wrap the single DTO in an array
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUsers(): Promise<{ statusCode: number; message: string; data: UserDto[] }> {
    this.logger.log("getAllUsers");
    try {
      const users = await this.prisma.user.findMany();
      const userDtos = plainToInstance(UserDto, users);
      return {
        statusCode: HttpStatus.OK,
        message: "Users retrieved successfully",
        data: userDtos,
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   try {
  //     const createUser = await this.prisma.user.create({
  //       data,
  //     });
  //     console.log("data", data);
  //     return createUser;
  //   } catch (e) {
  //     console.log("ERROR", e);
      
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  
  async createUser(dto: CreateUserDto): Promise<{ statusCode: number; message: string; data: User | null }> {
    try {
      // Validate the DTO
      await validateDto(dto);

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create the user
      const createUser = await this.prisma.user.create({        
        data: {
        
          email: dto.email,
         password: hashedPassword, //dto.password,
         phone: dto.phone
         
        },
      });

      console.log("User created:", createUser);
      //return createUser;
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User successfully created',
        data: createUser,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   this.logger.log("updateUser");
  //   try {
  //     const updateUser = await this.prisma.user.update({
  //       where: params.where,
  //       data: params.data,
  //     });
  //     return updateUser;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }


  // async updateUser(
  //   where: Prisma.UserWhereUniqueInput,
  //   updateUserDto: UpdateUserDto
  // ): Promise<User> {
  //   this.logger.log('updateUser');

  //   try {
  //     // Validate the DTO
  //     await validateDto(updateUserDto);

  //     // Update the user
  //     const updateUser = await this.prisma.user.update({
  //       where,
  //       data: updateUserDto,
  //     });

  //     return updateUser;
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || 'Something went wrong',
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // async updateUser(
  //   id: string,
  //   Dto: UpdateUserDto
  // ): Promise<User> {
  //   console.log("SERVICES id", id);
  //   try {

      
  //     await validateDto(Dto);

  //     // Update the user
  //     const updateUser = await this.prisma.user.update({
  //       where: { id },
  //       data: {
        
  //         email: Dto.email,
  //         name: Dto.name,
         
  //       },
  //     });

  //     console.log("SERVICES updateUser", updateUser);

  //     return updateUser;
  //   } catch (e) {
  //     console.error('ERROR', e);
  //     throw new Error(e.message || 'Something went wrong');
  //   }
  // }
  
  async updateUser(id : string,dto: CreateUserDto): Promise<{ statusCode: number; message: string; data: User | null}> {
    try {
      // Validate the DTO
      await validateDto(dto);

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create the user
      const Updateuser = await this.prisma.user.update({
        where: { id },
        data: {
        
          email: dto.email,
          password: hashedPassword, //dto.password,
          phone: dto.phone
         
        },
      });

      console.log("User created:", Updateuser);
      //return createUser;
      return {
        statusCode: HttpStatus.OK,
        message: 'User successfully updated',
        data: Updateuser,
      };
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async deleteUser(id : string,dto: CreateUserDto): Promise<{statusCode: number; message: string; data: User | null}> {
  //   this.logger.log("deleteUser");
  //   try {
  //     const deleteUser = await this.prisma.user.delete({
  //       where : { id },
  //     });
  //     //return deleteUser;
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'User successfully deleted',
  //       data: deleteUser,
  //     };
  //   } catch (e) {
  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async deleteUser(id : string): Promise<{
    statusCode: number; message: string; user?: User; 
  }> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where : { id },
      });
      return {
        user: deletedUser,
        statusCode: HttpStatus.OK, // Successful deletion
        message: "User successfully deleted.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }


// async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<{ user?: User; statusCode: number; message: string }> {
//   this.logger.log("deleteUser");
//   try {
//       // Attempt to delete the user based on the provided unique identifier
//       const deletedUser = await this.prisma.user.delete({
//           where,
//       });
//       return {
//           user: deletedUser,
//           statusCode: HttpStatus.OK, // Successful deletion
//           message: "User successfully deleted.",
//       };
//   } catch (e) {
//       // Log the error message for debugging
//       this.logger.error(`Error deleting user: ${e.message}`);

//       // Determine the status code and message based on the error type
//       const statusCode = e.status || HttpStatus.BAD_REQUEST;
//       const errorMessage = e.message || "Failed to delete user. Please try again.";

//       // Return an object with status code and message
//       return {
//           statusCode,
//           message: errorMessage,
//       };
//   }
// }

  async UserLogin(email: string, password: string): Promise<{ status: number; message: string; data?: UserDto }> {
    try {
      // Find the user by email
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw createCustomError("User not found", HttpStatus.NOT_FOUND);
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      //const isPasswordValid = await bcrypt.hash(password);

      if (!isPasswordValid) {
        throw createCustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }

     // const payload = { userId: user.id }; // Adjust payload as needed
     // const token = this.jwtService.sign(payload);

      //console.log("token", token);
      
      // Store the token in the database
      //await this.createToken(user.id, token);

      //return plainToInstance(UserDto, user);
      const userDto = plainToInstance(UserDto, user);

      return {
        status: HttpStatus.OK,
        message: "Login successful",
        data: userDto,        
      };     

    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }  
  // async createToken(userid : string, token: string): Promise<{userid : string, token: string}> {
  //   try {
  //     // Validate the DTO
  //     //await validateDto(dto);

  //     // Create the Token
  //     const createtoken = await this.prisma.token.create({
  //       data: {
  //         userid: userid,
  //         token: token         
  //       },
  //     });

  //     console.log("token created:", createtoken);
  //     return createtoken;
  //   } catch (e) {
  //     console.log("ERROR", e);

  //     throw createCustomError(
  //       e.message || "Something went wrong",
  //       e.status || HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }  
  async createToken(userid : string): Promise<string> {
    try {
     
      const payload = { userId: userid }; 
      const token = this.jwtService.sign(payload);

      // Create the user
      const createtoken = await this.prisma.token.create({
        data: {
          userid: userid,
          token: token,
        },
      });

      console.log("token created:", createtoken);
      return createtoken.token;;
    } catch (e) {
      console.log("ERROR", e);

      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}