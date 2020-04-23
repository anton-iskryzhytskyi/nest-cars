import { Module } from '@nestjs/common'
import { CarsService } from './cars.service'
import { CarsController } from './cars.controller'
import { CarEntity, OwnerEntity, ManufacturerEntity } from './entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [ TypeOrmModule.forFeature([ ManufacturerEntity, CarEntity, OwnerEntity ]) ],
  controllers: [ CarsController ],
  providers: [ CarsService ]
})

export class CarsModule {}
