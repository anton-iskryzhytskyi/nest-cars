import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Params as PinoParams } from 'nestjs-pino'
import { createWriteStream } from 'fs'

export interface AppConfig {
  port: number
}

export interface SpecialActionConfig {
  ownerPurchaseDateMonthCount: number
  discountPercent: number
  carRegisteredFromMonthCount: number
  carRegisteredToMonthCount: number
}

const getEnv = (name: string): string => {
  return process.env[name]
}

const database = (): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: getEnv('POSTGRES_HOST'),
  port: parseInt(getEnv('POSTGRES_PORT')),
  username: getEnv('POSTGRES_USER'),
  password: getEnv('POSTGRES_PASSWORD'),
  database: getEnv('POSTGRES_DATABASE'),

  entities: ['dist/**/*.entity{.ts,.js}'],
})

const specialAction = (): SpecialActionConfig => ({
  ownerPurchaseDateMonthCount: parseInt(getEnv('OWNER_PURCHASE_DATE_MONTH_COUNT')),
  discountPercent: parseInt(getEnv('DISCOUNT_PERCENT')),
  carRegisteredFromMonthCount: parseInt(getEnv('CAR_REGISTERED_FROM_MONTH_COUNT')),
  carRegisteredToMonthCount: parseInt(getEnv('CAR_REGISTERED_TO_MONTH_COUNT')),
})

const app = (): AppConfig => ({
  port: parseInt(getEnv('APP_PORT'))
})

const logger = (): PinoParams => ({
  pinoHttp: {
    name: getEnv('LOG_NAME'),
    level: getEnv('LOG_LEVEL'),
    stream: createWriteStream(getEnv('LOG_FILE'), { flags: 'a' })
  }
})

export default () => ({
  app: app(),
  logger: logger(),
  database: database(),
  specialAction: specialAction()
})
