import { OmitType } from '@nestjs/swagger'
import { OwnerDTO } from './owner.dto'
import {IsISO8601, IsNumber, IsString, IsUUID} from 'class-validator'

export class CreateOwnerDTO extends OmitType(OwnerDTO, ['id']) {
  @IsString()
  name: string

  @IsISO8601()
  purchaseDate: string

  @IsString()
  phone: string

  @IsNumber()
  serit: number
}
