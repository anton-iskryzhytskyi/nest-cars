import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { ManufacturerEntity } from './manufacturer.entity'
import { OwnerEntity } from './owner.entity'

@Entity('cars')
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('numeric', {  precision: 10, scale: 2 })
  price: number

  @Column("date", { name: 'first_registration_date', default: () => "CURRENT_TIMESTAMP" })
  firstRegistrationDate: Date

  @ManyToOne(() => ManufacturerEntity)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: ManufacturerEntity;

  @OneToMany(() => OwnerEntity, owner => owner.car)
  owners: OwnerEntity[]

  static createWithId(id: string) {
    return new CarEntity({ id })
  }

  static create(src: Partial<CarEntity>) {
    return new CarEntity(src)
  }

  constructor(src: Partial<CarEntity>) {
    if (src) {
      Object.entries(src).forEach(([key, value]) => {
        this[key] = value
      })
    }
  }
}
