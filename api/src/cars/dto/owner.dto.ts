import { ApiProperty } from '@nestjs/swagger'

export class OwnerDTO {
  @ApiProperty({
    required: true,
    description: 'Id of the manufacturer'
  })
  id: string

  @ApiProperty({
    required: true,
    description: 'Name of the manufacturer',
    type: 'string',
    maxLength: 125
  })
  name: string

  @ApiProperty({
    required: true,
    description: 'Name of the manufacturer',
    type: 'string',
    maxLength: 125
  })
  purchaseDate: string

  @ApiProperty({
    required: false,
    description: 'Phone of the manufacturer',
    type: 'string',
    maxLength: 25
  })
  phone: string

  @ApiProperty({
    required: false,
    description: 'Some property of the manufacturer',
    type: 'integer',
    format: 'int64'
  })
  serit: number
}
