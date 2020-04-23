import { ApiProperty } from '@nestjs/swagger'
import { CarDTO } from './car.dto'

export class CarListDTO {
  @ApiProperty({
    required: true,
    description: 'The number of all cars',
  })
  count: number

  @ApiProperty({
    required: true,
    description: 'Cars list',
    type: CarDTO
  })
  entities: CarDTO[]
}
