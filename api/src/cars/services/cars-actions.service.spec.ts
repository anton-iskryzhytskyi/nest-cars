import { Test, TestingModule } from '@nestjs/testing'
import { CarsActionsService } from './cars-actions.service'

describe('CarsService', () => {
  let service: CarsActionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsActionsService],
    }).compile()

    service = module.get<CarsActionsService>(CarsActionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
