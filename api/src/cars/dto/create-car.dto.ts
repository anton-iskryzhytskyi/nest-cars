import { OmitType, ApiProperty } from '@nestjs/swagger'
import { IsISO8601, IsUUID, IsNumber } from 'class-validator'
import { CarDTO } from './car.dto'
import { WithManufacturerId } from '../interfaces/with-manufacturer-id'

export class CreateCarDTO extends OmitType(CarDTO, ['id', 'owners', 'manufacturer']) implements WithManufacturerId {
  @IsNumber()
  price: number

  @IsISO8601()
  firstRegistrationDate: Date

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'uuid',
    description: 'The manufacturer Id of the car',
  })
  @IsUUID('4')
  manufacturerId: string
}

