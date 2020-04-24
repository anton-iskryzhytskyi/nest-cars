import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CarsModule } from './cars/cars.module'
import configurations from './shared/configurations'
import { Logger } from './shared/logging/interfaces'
import { AppLogger } from './shared/logging/app-logger'
import { createLoggingMiddleware } from './shared/middlewares/logging.middleware'

const setupAppLogger = (): Logger => {

  return AppLogger.create([])
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.sample'],
      load: [configurations]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    CarsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggingMiddleware(setupAppLogger()))
      .forRoutes('*')
  }
}
