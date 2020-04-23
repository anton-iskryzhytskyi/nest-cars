import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import {CarEntity} from './car.entity'
import {ManufacturerEntity} from './manufacturer.entity'
import {ApiProperty} from '@nestjs/swagger'

@Entity('owners')
export class OwnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 125 })
  name: string

  @Column("date", { name: 'purchased_at', default: () => "CURRENT_TIMESTAMP" })
  purchaseDate: string

  @Column("date")
  phone: string

  @Column("bigint")
  serit: number

  @ManyToOne(() => ManufacturerEntity)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity

  static create(src: Partial<OwnerEntity>) {
    return new OwnerEntity(src)
  }

  constructor(src: Partial<OwnerEntity>) {
    if (src) {
      Object.entries(src).forEach(([key, value]) => {
        this[key] = value
      })
    }
  }
}
