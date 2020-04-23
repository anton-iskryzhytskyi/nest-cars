import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger'
import { CarListDTO } from './dto/car-list.dto'
import {CarDTO} from './dto/car.dto'
import {OwnerDTO} from './dto/owner.dto'
import {ManufacturerDTO} from './dto/manufacturer.dto'

export const SwaggerFind = () => {
  return applyDecorators(
    ApiResponse({ status: 200, type: CarListDTO }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiQuery({ name: 'offset', type: Number, required: false }),
    ApiQuery({ name: 'limit', type: Number, required: false }),
    ApiQuery({ name: 'includeManufacturer', type: Boolean, required: false }),
    ApiQuery({ name: 'includeOwners', type: Boolean, required: false }),
  )
}

export const SwaggerCreate = () => {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'Car was successfully created' }),
    ApiResponse({ status: 400, description: 'Bad request' })
  )
}

export const SwaggerFindOme = () => {
  return applyDecorators(
    ApiResponse({ status: 200, type: CarDTO }),
    ApiResponse({ status: 404, description: 'Car not found' })
  )
}

export const SwaggerUpdate = () => {
  return applyDecorators(
    ApiResponse({ status: 204, description: 'Car was successfully updated' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Car not found' }),
  )
}

export const SwaggerRemove = () => {
  return applyDecorators(
    ApiResponse({ status: 204, description: 'Car was successfully deleted' }),
    ApiResponse({ status: 404, description: 'Car not found' })
  )
}

export const SwaggerFindOwners = () => {
  return applyDecorators(
    ApiResponse({ status: 200, type: [OwnerDTO] }),
    ApiResponse({ status: 404, description: 'Car not found' })
  )
}

export const SwaggerAttachNewOwner = () => {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'New owner was attached to the car' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 404, description: 'Car not found' }),
  )
}

export const SwaggerFindManufacturer = () => {
  return applyDecorators(
    ApiResponse({ status: 200, type: ManufacturerDTO }),
    ApiResponse({ status: 404, description: 'Car not found' })
  )
}

