import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { CountryModule } from './module/country/country.module';
import { StateModule } from './module/state/state.module';
import { CityModule } from './module/city/city.module';

@Module({
  imports: [PrismaModule, UserModule, CountryModule, StateModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
