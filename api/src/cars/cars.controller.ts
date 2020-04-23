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
import { CreateCarDTO } from './dto/create-car.dto'
import { UpdateCarDTO } from './dto/update-car.dto'
import { CarsService } from './cars.service'
import { CheckManufacturerPipe } from './pipes/check-manufacturer.pipe'
import { CarDTO } from './dto/car.dto'
import { ParseOptionalBoolPipe } from '../shared/utils/parse-optional-bool-pipe'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
import { CarListDTO } from './dto/car-list.dto'
import { OwnerDTO } from './dto/owner.dto'
import { ManufacturerDTO} from './dto/manufacturer.dto'
import {CreateOwnerDTO} from './dto/create-owner.dto'


@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  @ApiResponse({ status: 200, type: CarListDTO })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'includeManufacturer', type: Boolean, required: false })
  @ApiQuery({ name: 'includeOwners', type: Boolean, required: false })
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
  @ApiResponse({ status: 200, type: CarDTO })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOne(id)
  }

  @Post()
  @UsePipes(CheckManufacturerPipe)
  @ApiResponse({ status: 201, description: 'Car was successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() entity: CreateCarDTO) {
    return this.carsService.create(entity)
  }

  @Patch(':id')
  @HttpCode(204)
  @UsePipes(CheckManufacturerPipe)
  @ApiResponse({ status: 204, description: 'Car was successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() entity: UpdateCarDTO) {
    return this.carsService.update(id, entity)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Car was successfully deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.remove(id)
  }

  @Get(':id/owners')
  @ApiResponse({ status: 200, type: [OwnerDTO] })
  findOwners(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOwnersOfOne(id)
  }

  @Post(':id/owners')
  @ApiResponse({ status: 201, description: 'New owner was attached to the car' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  attachNewOwner(@Param('id', ParseUUIDPipe) id: string, @Body() owner: CreateOwnerDTO) {
    return this.carsService.attachNewOwner(id, owner)
  }

  @Get(':id/manufacturer')
  @ApiResponse({ status: 200, type: ManufacturerDTO })
  findManufacturer(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findManufacturerOfOne(id)
  }
}
