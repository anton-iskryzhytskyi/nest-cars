import { CheckCarByIdPipe } from './check-car-by-id.pipe'
import {NotFoundException} from '@nestjs/common'

describe('CheckCarByIdPipe', () => {
  const carsRepoMock: any = {}

  beforeEach(() => {
    carsRepoMock.count = jest.fn().mockResolvedValue(1)
  })

  describe('#transform', () => {

    it('should return undefined if value is undefined', async () => {
      const pipe = new CheckCarByIdPipe(carsRepoMock)

      const result = await pipe.transform(undefined)

      expect(result).toBeUndefined()
      expect(carsRepoMock.count).not.toBeCalled()

    })

    it('should check if car with id as the given value is exist', async () => {
      const pipe = new CheckCarByIdPipe(carsRepoMock)

      await pipe.transform('some-uuid')

      expect(carsRepoMock.count).toBeCalledWith({ id: 'some-uuid' })
    })

    it('should throw a NotFoundError if car with id as the given value isn`t exist', async () => {
      carsRepoMock.count = jest.fn().mockResolvedValue(0)
      const pipe = new CheckCarByIdPipe(carsRepoMock)

      await expect(() => pipe.transform('some-uuid')).rejects.toBeInstanceOf(NotFoundException)
    })

  })
})
