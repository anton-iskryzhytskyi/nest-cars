import {
  PipeTransform,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CarEntity } from '../entity'

@Injectable()
export class CheckCarByIdPipe implements PipeTransform<string> {
  constructor(
    @InjectRepository(CarEntity) private readonly carsRepository: Repository<CarEntity>
  ) {}

  async transform(value: string) {
    if (!value) {
      return value
    }

    const isExist = await this.carsRepository
      .count({ id: value })
      .then(count => count > 0)

    if (!isExist) {
      throw new NotFoundException('Car with such id doesn`t exist')
    }

    return value
  }
}
