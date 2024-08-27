import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controller/user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Admin@123',
      signOptions: { expiresIn: '24h' }, 
    }),
    PrismaModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}