import { ApiProperty } from '@nestjs/swagger'

export class ManufacturerDTO {
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
    description: 'Phone of the manufacturer',
    type: 'string',
    maxLength: 25
  })
  phone: string

  @ApiProperty({
    required: true,
    description: 'Some property of the manufacturer',
    type: 'integer',
    format: 'int64'
  })
  serit: number
}
