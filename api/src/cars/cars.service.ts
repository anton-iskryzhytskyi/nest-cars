import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CarEntity, ManufacturerEntity, OwnerEntity } from './entity'
import { CreateCarDTO } from './dto/create-car.dto'
import { UpdateCarDTO } from './dto/update-car.dto'
import { CreateOwnerDTO } from './dto/create-owner.dto'


@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity) private readonly carsRepository: Repository<CarEntity>,
    @InjectRepository(OwnerEntity) private readonly ownerRepository: Repository<OwnerEntity>
  ) {}

  public findAndCount(
    limit: number,
    offset: number,
    includeManufacturer: boolean,
    includeOwners: boolean,
  ) {
    return this.initFindQueryBuilder(includeManufacturer, includeOwners)
      .limit(limit)
      .offset(offset)
      .getManyAndCount()
  }

  public findOne(id: string, includeManufacturer?: boolean, includeOwners?: boolean) {
    return this.initFindQueryBuilder(includeManufacturer, includeOwners)
      .where("car.id = :id", { id })
      .getOne()
  }

  public async create(dto: CreateCarDTO) {
    const { manufacturerId, ...src } = dto

    const entity = CarEntity.create(src)

    entity.manufacturer = ManufacturerEntity.createWithId(manufacturerId)

    await this.carsRepository.save(entity)
  }

  public async update(id: string, dto: UpdateCarDTO) {
    const { manufacturerId, ...src } = dto

    const entity = CarEntity.create({ id, ...src })

    if (manufacturerId) {
      entity.manufacturer = ManufacturerEntity.createWithId(manufacturerId)
    }

    await this.carsRepository.save(entity)
  }

  public async remove(id: string) {
    const entity = CarEntity.createWithId(id)

    await this.carsRepository.remove(entity)
  }

  public findManufacturerOfOne(id: string) {
    return this.findOne(id, true)
      .then(entity => entity?.manufacturer)
  }

  public findOwnersOfOne(id: string) {
    return this.findOne(id, false, true)
      .then(entity => entity?.owners)
  }

  public async attachNewOwner(id: string, dto: CreateOwnerDTO) {
    const ownerEntity = OwnerEntity.create(dto)

    ownerEntity.car = CarEntity.createWithId(id)

    await this.ownerRepository.save(ownerEntity)
  }

  private initFindQueryBuilder(includeManufacturer?: boolean, includeOwners?: boolean) {
    const builder = this.carsRepository
      .createQueryBuilder('car')

    if (includeManufacturer) {
      builder.innerJoinAndSelect('car.manufacturer', 'manufacturer')
    }
    if (includeOwners) {
      builder.leftJoinAndSelect("car.owners", "owner")
    }

    return builder
  }
}
