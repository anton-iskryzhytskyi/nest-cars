// TODO discuss the methods names and args names

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as moment from 'moment'
import { CarEntity, OwnerEntity } from '../entity'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

@Injectable()
export class CarsActionsService {
  constructor(
    @InjectRepository(CarEntity) private readonly carsRepository: Repository<CarEntity>,
    @InjectRepository(OwnerEntity) private readonly ownerRepository: Repository<OwnerEntity>
  ) {}

  /**
   * removes all old car owners which have the purchaseDate older than now - monthsCount
   * @param monthsCount - should be grater than 0
   */
  public async removeOwnersByPurchaseDateLTMonthsAgo(monthsCount: number) {
    if (monthsCount <= 0) {
      throw new Error('Invalid arguments')
    }

    const date = moment()
      .subtract(monthsCount, 'months')
      .format(ISO_DATE_FORMAT)

    await this.ownerRepository
      .createQueryBuilder()
      .delete()
      .where('owners.purchased_at < :date', { date })
      .execute()
  }

  /**
   * Applies the discount in percents to cars which were registered between
   * now - fromMonths and now - toMonths
   * @param fromMonths - should be less thann toMonths
   * @param toMonths - should be greater than fromMonths
   * @param discountPercentage - between 0 and 100
   */
  public async applyDiscountForCarsRegisteredBetweenMonthsAgo(fromMonths: number, toMonths: number, discountPercentage: number) {
    const isDiscountPercentageWrong = discountPercentage > 100 || discountPercentage < 0
    const isPeriodWrong = fromMonths < 0 || toMonths < 0 || toMonths >= fromMonths

    if (isDiscountPercentageWrong || isPeriodWrong) {
      throw new Error('Invalid arguments')
    }

    const from = moment()
      .subtract(fromMonths, 'months')
      .format(ISO_DATE_FORMAT)

    const to = moment()
      .subtract(toMonths, 'months')
      .format(ISO_DATE_FORMAT)

    // this action also escape the value
    const multiplyFactor = (100 - discountPercentage) / 100

    await this.carsRepository
      .createQueryBuilder()
      .update()
      .where('cars.first_registration_date <= :to', { to })
      .andWhere('cars.first_registration_date >= :from', { from })
      .set({
        price: () => `price * ${multiplyFactor}`
      })
      .execute()
  }

}
