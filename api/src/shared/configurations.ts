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

const parseIntOrReturnUndefined = (str: string): number => {
  if (!str) {
    return undefined
  }
  const value = parseInt(str)
  if (isNaN(value)) {
    return undefined
  }
}

const specialAction = (): SpecialActionConfig => {

  const ownerPurchaseDateMonthCount = parseIntOrReturnUndefined(getEnv('OWNER_PURCHASE_DATE_MONTH_COUNT')) || 18
  const discountPercent = parseIntOrReturnUndefined(getEnv('DISCOUNT_PERCENT')) || 20
  const carRegisteredFromMonthCount = parseIntOrReturnUndefined(getEnv('CAR_REGISTERED_FROM_MONTH_COUNT')) || 18
  const carRegisteredToMonthCount = parseIntOrReturnUndefined(getEnv('CAR_REGISTERED_TO_MONTH_COUNT')) || 12

  return  {
    ownerPurchaseDateMonthCount,
    discountPercent,
    carRegisteredToMonthCount,
    carRegisteredFromMonthCount
  }
}

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
