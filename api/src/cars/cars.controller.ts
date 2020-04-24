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
  SwaggerRemove, SwaggerSpecialAction,
  SwaggerUpdate
} from './swagger-decorators'
import { CreateCarDTO } from './dto/create-car.dto'
import { UpdateCarDTO } from './dto/update-car.dto'
import { CarsCrudService } from './services/cars-crud.service'
import { CarsActionsService } from './services/cars-actions.service'
import { CheckManufacturerPipe } from './pipes/check-manufacturer.pipe'
import { CarDTO } from './dto/car.dto'
import { ParseOptionalBoolPipe } from '../shared/utils/parse-optional-bool-pipe'
import { SpecialActionConfig } from '../shared/configurations'
import { CreateOwnerDTO } from './dto/create-owner.dto'
import { CheckCarByIdPipe } from './pipes/check-car-by-id.pipe'
import { ConfigService } from '@nestjs/config'


@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(
    private crudService: CarsCrudService,
    private actionService: CarsActionsService,
    private config: ConfigService
  ) {}

  @Get()
  @SwaggerFind()
  async find(
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
    @Query('includeManufacturer', ParseOptionalBoolPipe) includeManufacturer = true,
    @Query('includeOwners', ParseOptionalBoolPipe) includeOwners = true,
  ): Promise<{ count: number, entities: CarDTO[] }> {
    const [entities, count] = await this.crudService.findAndCount(
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
    return this.crudService.findOne(id)
  }

  @Post()
  @UsePipes(CheckManufacturerPipe)
  @SwaggerCreate()
  async create(@Body() entity: CreateCarDTO) {
    await this.crudService.create(entity)
  }

  @Patch(':id')
  @HttpCode(204)
  @UsePipes(CheckManufacturerPipe)
  @SwaggerUpdate()
  async update(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string, @Body() entity: UpdateCarDTO) {
    await this.crudService.update(id, entity)
  }

  @Delete(':id')
  @HttpCode(204)
  @SwaggerRemove()
  async remove(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    await this.crudService.remove(id)
  }

  @Get(':id/owners')
  @SwaggerFindOwners()
  findOwners(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.crudService.findOwnersOfOne(id)
  }

  @Post(':id/owners')
  @SwaggerAttachNewOwner()
  async attachNewOwner(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string, @Body() owner: CreateOwnerDTO) {
    await this.crudService.attachNewOwner(id, owner)
  }

  @Get(':id/manufacturer')
  @SwaggerFindManufacturer()
  findManufacturer(@Param('id', ParseUUIDPipe, CheckCarByIdPipe) id: string) {
    return this.crudService.findManufacturerOfOne(id)
  }

  @Post('/special-action')
  @HttpCode(204)
  @SwaggerSpecialAction()
  async specialAction() {
    const {
      carRegisteredFromMonthCount,
      carRegisteredToMonthCount,
      discountPercent,
      ownerPurchaseDateMonthCount,
    }: SpecialActionConfig = this.config.get('specialAction')

    await this.actionService.applyDiscountForCarsRegisteredBetweenMonthsAgo(
      carRegisteredFromMonthCount,
      carRegisteredToMonthCount,
      discountPercent,
    )

    await this.actionService.removeOwnersByPurchaseDateLTMonthsAgo(ownerPurchaseDateMonthCount)
  }
}
