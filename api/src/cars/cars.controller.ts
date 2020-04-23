import { ApiTags } from '@nestjs/swagger'
import {
  Query,
  Get,
  Param,
  Controller,
  Post,
  Body,
  HttpCode,
  Patch,
  Delete,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common'
import {
  SwaggerAttachNewOwner,
  SwaggerCreate,
  SwaggerFind,
  SwaggerFindManufacturer,
  SwaggerFindOme,
  SwaggerFindOwners,
  SwaggerRemove,
  SwaggerUpdate
} from './swagger-decorators'
import { CreateCarDTO } from './dto/create-car.dto'
import { UpdateCarDTO } from './dto/update-car.dto'
import { CarsService } from './cars.service'
import { CheckManufacturerPipe } from './pipes/check-manufacturer.pipe'
import { CarDTO } from './dto/car.dto'
import { ParseOptionalBoolPipe } from '../shared/utils/parse-optional-bool-pipe'
import { CreateOwnerDTO } from './dto/create-owner.dto'
import { CheckCarByIdPipe } from './pipes/check-car-by-id.pipe'


@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  @SwaggerFind()
  async find(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
    @Query('includeManufacturer', ParseOptionalBoolPipe) includeManufacturer = true,
    @Query('includeOwners', ParseOptionalBoolPipe) includeOwners = true,
  ): Promise<{ count: number, entities: CarDTO[] }> {
    const [entities, count] = await this.carsService.findAndCount(
      limit,
      offset,
      includeManufacturer,
      includeOwners
    )

    return { count, entities }
  }

  @Get(':id')
  @SwaggerFindOme()
  findOne(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.carsService.findOne(id)
  }

  @Post()
  @UsePipes(CheckManufacturerPipe)
  @SwaggerCreate()
  create(@Body() entity: CreateCarDTO) {
    return this.carsService.create(entity)
  }

  @Patch(':id')
  @HttpCode(204)
  @UsePipes(CheckManufacturerPipe)
  @SwaggerUpdate()
  update(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string, @Body() entity: UpdateCarDTO) {
    return this.carsService.update(id, entity)
  }

  @Delete(':id')
  @HttpCode(204)
  @SwaggerRemove()
  remove(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.carsService.remove(id)
  }

  @Get(':id/owners')
  @SwaggerFindOwners()
  findOwners(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.carsService.findOwnersOfOne(id)
  }

  @Post(':id/owners')
  @SwaggerAttachNewOwner()
  attachNewOwner(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string, @Body() owner: CreateOwnerDTO) {
    return this.carsService.attachNewOwner(id, owner)
  }

  @Get(':id/manufacturer')
  @SwaggerFindManufacturer()
  findManufacturer(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.carsService.findManufacturerOfOne(id)
  }
}
