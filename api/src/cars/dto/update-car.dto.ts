import { PartialType } from '@nestjs/swagger'
import { CreateCarDTO } from './create-car.dto'
import { WithManufacturerId } from '../interfaces/with-manufacturer-id'
import { IsOptional } from 'class-validator'

export class UpdateCarDTO extends PartialType(CreateCarDTO) implements WithManufacturerId {
  @IsOptional()
  price: number

  @IsOptional()
  firstRegistrationDate: Date

  @IsOptional()
  manufacturerId: string
}
