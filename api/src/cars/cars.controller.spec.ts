import { CarsController } from './cars.controller'
import { CarsCrudService } from './services/cars-crud.service'
import { CarsActionsService } from './services/cars-actions.service'
import { ConfigService } from '@nestjs/config'

describe('CarsController', () => {

  const crudServiceMock: CarsCrudService = {} as any
  const actionServiceMock: CarsActionsService = {} as any
  const configServiceMock: ConfigService = {} as any

  const controller = new CarsController(crudServiceMock, actionServiceMock, configServiceMock)

  describe('#find', () => {

    it('should exec crudService.findAndCount with given params', async () => {
      crudServiceMock.findAndCount = jest.fn().mockResolvedValue([])
      const params = [5, 5, false, true]

      await controller.find(...params as any)

      expect(crudServiceMock.findAndCount).toBeCalledWith(5, 5, false, true)
    })

    it('should transform result of crudService to object', async () => {
      crudServiceMock.findAndCount = jest.fn().mockResolvedValue([[], 10])

      const result = await controller.find()

      expect(result.count).toBe(10)
      expect(result.entities).toEqual([])
    })
  })

  describe('#findOne', () => {

    it('should exec crudService.findOne with given params and return its result', async () => {
      crudServiceMock.findOne = jest.fn().mockResolvedValue({ foo: 'bar' })

      const result = await controller.findOne('some-uuid')

      expect(result).toMatchObject({ foo: 'bar' })
    })
  })

  describe('#create', () => {

    it('should exec crudService.create with given params', async () => {
      crudServiceMock.create = jest.fn().mockResolvedValue(null)

      await controller.create({ foo: 'bar' } as any)

      expect(crudServiceMock.create).toBeCalledWith({ foo: 'bar' })
    })
  })

  describe('#update', () => {

    it('should exec crudService.update with given params', async () => {
      crudServiceMock.update = jest.fn().mockResolvedValue(null)

      await controller.update('some-uuid-2', { foo: 'bar' } as any)

      expect(crudServiceMock.update).toBeCalledWith('some-uuid-2', { foo: 'bar' })
    })
  })

  describe('#remove', () => {

    it('should exec crudService.remove with given params', async () => {
      crudServiceMock.remove = jest.fn().mockResolvedValue(null)

      await controller.remove('some-uuid-3')

      expect(crudServiceMock.remove).toBeCalledWith('some-uuid-3')
    })
  })

  describe('#attachNewOwner', () => {

    it('should exec crudService.attachNewOwner with given params', async () => {
      crudServiceMock.attachNewOwner = jest.fn().mockResolvedValue(null)

      await controller.attachNewOwner('some-uuid-4', { foo: 'bax' } as any)

      expect(crudServiceMock.attachNewOwner).toBeCalledWith('some-uuid-4', { foo: 'bax' })
    })
  })

  describe('#findOwners', () => {

    it('should exec crudService.findOwnersOfOne with given params and return its result', async () => {
      crudServiceMock.findOwnersOfOne = jest.fn().mockResolvedValue([{ foo: 'bar' }])

      const result = await controller.findOwners('some-uuid-5')

      expect(result).toEqual([{ foo: 'bar' }])
      expect(crudServiceMock.findOwnersOfOne).toBeCalledWith('some-uuid-5')
    })
  })

  describe('#findManufacturer', () => {

    it('should exec crudService.findManufacturerOfOne with given params and return its result', async () => {
      crudServiceMock.findManufacturerOfOne = jest.fn().mockResolvedValue({ foo: 'barax' })

      const result = await controller.findManufacturer('some-uuid-6')

      expect(result).toEqual({ foo: 'barax' })
      expect(crudServiceMock.findManufacturerOfOne).toBeCalledWith('some-uuid-6')
    })
  })

  describe('#specialAction', () => {
    const actionConfig = {
      carRegisteredFromMonthCount: 10,
      carRegisteredToMonthCount: 5,
      discountPercent: 50,
      ownerPurchaseDateMonthCount: 15,
    }
    actionServiceMock.removeOwnersByPurchaseDateLTMonthsAgo = jest.fn().mockResolvedValue(null)
    actionServiceMock.applyDiscountForCarsRegisteredBetweenMonthsAgo = jest.fn().mockResolvedValue(null)
    configServiceMock.get = jest.fn().mockReturnValue(actionConfig)

    it('should get special action config', async () => {
      await controller.specialAction()

      expect(configServiceMock.get).toBeCalledWith('specialAction')
    })

    it('should exec actionService.removeOwnersByPurchaseDateLTMonthsAgo with config params', async () => {
      await controller.specialAction()

      expect(actionServiceMock.removeOwnersByPurchaseDateLTMonthsAgo)
        .toBeCalledWith(actionConfig.ownerPurchaseDateMonthCount)
    })

    it('should exec actionService.applyDiscountForCarsRegisteredBetweenMonthsAgo', async () => {
      await controller.specialAction()

      expect(actionServiceMock.applyDiscountForCarsRegisteredBetweenMonthsAgo)
        .toBeCalledWith(
          actionConfig.carRegisteredFromMonthCount,
          actionConfig.carRegisteredToMonthCount,
          actionConfig.discountPercent,
        )
    })

  })
})
