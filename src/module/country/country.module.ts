import { Module } from '@nestjs/common';

import { CountryService } from './services/country.service';
import { CountryController } from './controller/country.controller';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
