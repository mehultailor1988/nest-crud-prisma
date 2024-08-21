import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: '19Meh@l$88', // Replace with your secret
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    PrismaModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}