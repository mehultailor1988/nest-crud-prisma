import { BadRequestException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Prisma, User, Token } from "@prisma/client";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Import bcrypt

import { UserDto } from "../dto";
import { CreateUserDto, validateDto } from '../dto/create-user.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { createCustomError } from "src/common/utils/helpers";

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

  async deleteUser(id : string): Promise<{statusCode: number; message: string; user?: User; }> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where : { id },
      });
      return {
        user: deletedUser,
        statusCode: HttpStatus.OK, 
        message: "User successfully deleted.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }

  async UserLogin(email: string, password: string): Promise<{ status: number; message: string; access_token: string }> {   
    try {

      if (!email) {
        throw new BadRequestException('Email is required');
      }

      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
  
      // Check if the user exists and validate password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      let accessToken: string;
      const existingToken = await this.prisma.token.findUnique({
        where: { userid: user.id },
      });

      if  (!existingToken) {
      // Create a JWT token
      const payload = { userId: user.id }; // Adjust payload fields as needed
      accessToken = await this.jwtService.signAsync(payload);

      await this.createToken(user.id, accessToken);     
      }
      else  {
        accessToken = existingToken.token;
      }
      
      const userDto = plainToInstance(UserDto, user);
  
      return {
        status: HttpStatus.OK,
        message: "Login successful",
        access_token: accessToken,
      };

    //   // Compare the provided password with the hashed password
    //   const isPasswordValid = await bcrypt.compare(password, user.password);
    //   //const isPasswordValid = await bcrypt.hash(password);

    //   if (!isPasswordValid) {
    //     throw createCustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    //   }

    //  // const payload = { userId: user.id }; // Adjust payload as needed
    //  // const token = this.jwtService.sign(payload);

    //   //console.log("token", token);
      
    //   // Store the token in the database
    //   //await this.createToken(user.id, token);

    //   //return plainToInstance(UserDto, user);
    //   const userDto = plainToInstance(UserDto, user);
    //   console.log("userDto", userDto);

    //   return {
    //     status: HttpStatus.OK,
    //     message: "Login successful",
    //     data: userDto,        
    //   };     

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
  async createToken(userid: string, accessToken: string): Promise<string> {
    try {
     
      // const payload = { userId: userid }; 
      // const token = this.jwtService.sign(payload);

      console.log("accessToken --> ", accessToken);

      // Create the user
      const createtoken = await this.prisma.token.create({
        data: {
          userid: userid,
          token: accessToken,
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

    // try {
    //   // Check if a token for the userId already exists
    //   const existingToken = await this.prisma.token.findUnique({
    //     where: { userid: userid },
    //   });

    //   console.log("existingToken --. ", existingToken);
  
    //   if (existingToken) {
    //     // If token exists, update it
        
    //     return existingToken.token;
    //     }
    //     else {
    //       // If token does not exist, create a new one
    //       const createtoken = await this.prisma.token.create({
    //         data: {
    //           userid: userid,
    //           token: accessToken,
    //         },
    //       });
    //       return createtoken.token;
    //     }
    //   } 
    //  catch (e) {
    //   console.error('Error handling token:', e.message);
    //   throw new BadRequestException('Failed to create or update token');
    // }

  }

  async deletetoken(userid : string): Promise<{statusCode: number; message: string; user?: Token; }> {
    try {
      const deletedtoken = await this.prisma.token.delete({
        where : { userid },
      });
      return {
        user: deletedtoken,
        statusCode: HttpStatus.OK, 
        message: "token successfully deleted.",
      };
    } catch (e) {
      throw createCustomError(
        e.message || "Something went wrong",
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
   }
}