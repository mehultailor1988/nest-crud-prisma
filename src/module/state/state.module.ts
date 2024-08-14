import { Module } from '@nestjs/common';
import { StateService } from './services/state.service';
import { StateController } from './controller/state.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
