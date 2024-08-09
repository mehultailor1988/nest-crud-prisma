import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], //import prisma module to use prisma service in your module
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}