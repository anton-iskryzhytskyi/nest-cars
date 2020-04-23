import {
  PipeTransform,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { WithManufacturerId } from '../interfaces/with-manufacturer-id'
import { ManufacturerEntity } from '../entity'


@Injectable()
export class CheckManufacturerPipe<T extends WithManufacturerId> implements PipeTransform<T> {
  constructor(
    @InjectRepository(ManufacturerEntity) private readonly manufacturersRepository: Repository<ManufacturerEntity>
  ) {}

  async transform(value: T) {
    if (!value.manufacturerId) {
      return value
    }

    const manufacturerEntity = await this.manufacturersRepository.findOne({ id: value.manufacturerId })

    if (!manufacturerEntity) {
      // throw new ConflictException('')
      throw new NotFoundException('Manufacturer with such id doesn`t exist')
    }

    return value;
  }
}
