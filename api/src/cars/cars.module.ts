import { Module } from '@nestjs/common'
import { CarsCrudService } from './services/cars-crud.service'
import { CarsActionsService } from './services/cars-actions.service'
import { CarsController } from './cars.controller'
import { CarEntity, OwnerEntity, ManufacturerEntity } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([ ManufacturerEntity, CarEntity, OwnerEntity ])
  ],
  controllers: [ CarsController ],
  providers: [ CarsCrudService, CarsActionsService, ConfigService ]
})

export class CarsModule {}
