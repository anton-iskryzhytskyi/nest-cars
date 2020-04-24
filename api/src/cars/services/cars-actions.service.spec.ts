import { CarsActionsService } from './cars-actions.service'
import { Repository } from 'typeorm'

describe('CarsActionService', () => {
  const ownersRepoMock: Repository<any> = {} as any
  const carsRepoMock: Repository<any> = {} as any
  let carRepoQueryBuilder
  let ownerRepoQueryBuilder
  let service: CarsActionsService

  beforeEach(() => {
    carRepoQueryBuilder = {
      update: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(null),
    } as any

    ownerRepoQueryBuilder = {
      delete: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(null),
    } as any

    carsRepoMock.createQueryBuilder = jest.fn().mockReturnValue(carRepoQueryBuilder)
    ownersRepoMock.createQueryBuilder = jest.fn().mockReturnValue(ownerRepoQueryBuilder)

    service = new CarsActionsService(carsRepoMock, ownersRepoMock)
  })

  describe('#removeOwnersByPurchaseDateLTMonthsAgo', () => {
    it('should remove car owners which have the purchaseDate older than now - monthsCount', async () => {
      await service.removeOwnersByPurchaseDateLTMonthsAgo(1)

      expect(ownerRepoQueryBuilder.delete).toBeCalled()
      expect(ownerRepoQueryBuilder.where).toBeCalled()
      expect(ownerRepoQueryBuilder.execute).toBeCalled()
    })

    it.skip('should validate input', async () => {
      // TODO
    })

    it.skip('should calculate date', async () => {
      // TODO
    })
  })

  describe('#applyDiscountForCarsRegisteredBetweenMonthsAgo', () => {

    it.skip('should calculate dates', async () => {
      // TODO
    })

    it.skip('should calculate discount', async () => {
      // TODO
    })

    it.skip('should validate input', async () => {
      // TODO
    })
  })

})
