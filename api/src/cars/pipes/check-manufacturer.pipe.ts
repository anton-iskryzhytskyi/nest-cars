import {
  PipeTransform,
  Injectable,
  BadRequestException
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

    const isExist = await this.manufacturersRepository
      .count({ id: value.manufacturerId })
      .then(count => count > 0)

    if (!isExist) {
      // TODO discuss which error is suitable
      // BadRequest means manufacturer id is not valid because it doesn't exist
      throw new BadRequestException('Manufacturer with such id doesn`t exist')
    }

    return value;
  }
}
