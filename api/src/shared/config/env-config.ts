import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Config } from './interfaces'
import { CONFIG_NAMES } from './config-names'

export class EnvConfig implements Config {
  private static instance: EnvConfig = new EnvConfig()

  private readonly configs: { [key: string]: string }

  static getInstance(): EnvConfig {
    return EnvConfig.instance
  }

  get(name: string): string {
    if (!this.configs[name]) {
      throw new Error(`Config "${name}" is not set!`)
    }
    return this.configs[name]
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.get('POSTGRES_HOST'),
      port: parseInt(this.get('POSTGRES_PORT')),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),

      entities: ['dist/**/*.entity{.ts,.js}'],
    }
  }

  private constructor() {
    this.configs = CONFIG_NAMES.reduce((acc, name) => {
      const value = process.env[name]

      if (!value) {
        throw new Error(`Config "${name}" is required!`)
      }

      return { ...acc, [name]: value }
    }, {})
  }
}
