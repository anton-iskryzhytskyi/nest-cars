import { Repository } from 'typeorm'
import { CarsCrudService } from './cars-crud.service'

describe('CarsCrudService', () => {
  const ownersRepoMock: Repository<any> = {} as any
  const carsRepoMock: Repository<any> = {} as any
  let carRepoQueryBuilder
  let service: CarsCrudService

  beforeEach(async () => {
    ownersRepoMock.save = jest.fn().mockResolvedValue(null)
    carsRepoMock.save = jest.fn().mockResolvedValue(null)

    carRepoQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[{ foo: 'bar' }], 1]),
      getOne: jest.fn().mockResolvedValue({ bar: 'foo' })
    } as any

    carsRepoMock.createQueryBuilder = jest.fn().mockReturnValue(carRepoQueryBuilder)

    service = new CarsCrudService(carsRepoMock, ownersRepoMock)
  })

  describe('#findAndCount', () => {
    it('should find and count car entities', async () => {
      const result = await service.findAndCount(1, 2, true, true)

      expect(result).toEqual([[{ foo: 'bar' }], 1])
    })

    it('should include manufacturer data', async () => {
      await service.findAndCount(1, 2, true, true)

      expect(carRepoQueryBuilder.innerJoinAndSelect).toBeCalled()
    })

    it('should include owners data', async () => {
      await service.findAndCount(1, 2, true, true)

      expect(carRepoQueryBuilder.leftJoinAndSelect).toBeCalled()
    })

    it('shouldn`t include manufacturer data', async () => {
      await service.findAndCount(1, 2, false, false)

      expect(carRepoQueryBuilder.innerJoinAndSelect).not.toBeCalled()
    })

    it('shouldn`t include owners data', async () => {
      await service.findAndCount(1, 2, false, false)

      expect(carRepoQueryBuilder.leftJoinAndSelect).not.toBeCalled()
    })

    it('should limit entities', async () => {
      await service.findAndCount(1, 2, false, false)

      expect(carRepoQueryBuilder.limit).toBeCalledWith(1)
    })

    it('should offset entities', async () => {
      await service.findAndCount(1, 2, false, false)

      expect(carRepoQueryBuilder.offset).toBeCalledWith(2)
    })
  })

  describe.skip('#findOne', () => {
    it('not implemented', async () => {
      // TODO
    })
  })

  describe('#create', () => {
    it('should create car and its manufacturer entities and save them', async () => {
      const firstRegistrationDate = new Date()
      await service.create({ manufacturerId: 'man-uuid', price: 100, firstRegistrationDate })

      expect(carsRepoMock.save).toBeCalledWith({
        price: 100,
        firstRegistrationDate,
        manufacturer: { id: 'man-uuid' }
      })
    })
  })

  describe.skip('#remove', () => {
    it('', async () => {
      // TODO
    })
  })

  describe.skip('#update', () => {
    it('', async () => {
      // TODO
    })
  })

  describe.skip('#findManufacturerOfOne', () => {
    it('', async () => {
      // TODO
    })
  })

  describe.skip('#findOwnersOfOne', () => {
    it('', async () => {
      // TODO
    })
  })

})
