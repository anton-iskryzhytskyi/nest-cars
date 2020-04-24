import { CheckManufacturerPipe } from './check-manufacturer.pipe'
import { BadRequestException } from '@nestjs/common'

describe('CheckCarByIdPipe', () => {
  const manufacturersRepoMock: any = {}

  beforeEach(() => {
    manufacturersRepoMock.count = jest.fn().mockResolvedValue(1)
  })

  describe('#transform', () => {

    it('should return given value if value.manufacturerId is undefined', async () => {
      const pipe = new CheckManufacturerPipe(manufacturersRepoMock)

      const result = await pipe.transform({})

      expect(result).toMatchObject({})
      expect(manufacturersRepoMock.count).not.toBeCalled()

    })

    it('should check if manufacturer with id as the given value.manufacturerId is exist', async () => {
      const pipe = new CheckManufacturerPipe(manufacturersRepoMock)

      await pipe.transform({ manufacturerId: 'some-uuid' })

      expect(manufacturersRepoMock.count).toBeCalledWith({ id: 'some-uuid' })
    })

    it('should throw a BadRequestException if manufacturer with id as the given value.manufacturerId isn`t exist', async () => {
      manufacturersRepoMock.count = jest.fn().mockResolvedValue(0)
      const pipe = new CheckManufacturerPipe(manufacturersRepoMock)

      await expect(() => pipe.transform({ manufacturerId: 'some-uuid' }))
        .rejects
        .toBeInstanceOf(BadRequestException)
    })

  })
})
