import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export interface Config {
  get(name: string): string

  getTypeOrmConfig(): TypeOrmModuleOptions
}
