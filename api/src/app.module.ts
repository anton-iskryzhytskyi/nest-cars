import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarsModule } from './cars/cars.module'
import { EnvConfig } from './shared/config/env-config'

@Module({
  imports: [TypeOrmModule.forRoot(EnvConfig.getInstance().getTypeOrmConfig()), CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
