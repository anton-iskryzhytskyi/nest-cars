import { ApiProperty } from '@nestjs/swagger'
import { ManufacturerDTO } from './manufacturer.dto'
import { OwnerDTO } from './owner.dto'

export class CarDTO {
  @ApiProperty({
    required: true,
    description: 'Id of the car',
    format: 'uuid'
  })
  id: string

  @ApiProperty({
    required: true,
    description: 'Price of the car: precision = 10 scale = 2'
  })
  price: number

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'date',
    description: 'Date of the first registration of the car',
    example: '2020-01-01'
  })
  firstRegistrationDate: Date

  @ApiProperty({
    required: true,
    description: 'The manufacturer of the car',
    type: () => ManufacturerDTO
  })
  manufacturer: ManufacturerDTO

  @ApiProperty({
    required: true,
    description: 'The car owners',
    type: () => OwnerDTO
  })
  owners: OwnerDTO[]
}
