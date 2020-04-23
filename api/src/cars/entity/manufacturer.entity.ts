import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm'

@Entity('manufacturers')
export class ManufacturerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 125 })
  name: string

  @Column('varchar', { length: 25 })
  phone: string

  @Column("bigint")
  serit: number

  static create(src: Partial<ManufacturerEntity>) {
    return new ManufacturerEntity(src)
  }

  static createWithId(id: string) {
    return new ManufacturerEntity({ id })
  }

  constructor(src: Partial<ManufacturerEntity>) {
    if (src) {
      Object.entries(src).forEach(([key, value]) => {
        this[key] = value
      })
    }
  }
}

