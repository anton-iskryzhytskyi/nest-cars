import { Test, TestingModule } from '@nestjs/testing'
import { CarsCrudService } from './cars-crud.service'

describe('CarsCrudService', () => {
  let service: CarsCrudService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsCrudService],
    }).compile()

    service = module.get<CarsCrudService>(CarsCrudService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
