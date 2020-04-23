import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarsModule } from './cars/cars.module'
import { EnvConfig } from './shared/config/env-config'
import {Config} from './shared/config/interfaces'
import {Logger} from './shared/logging/interfaces'
import {LoggerBuilder} from './shared/logging/logger-builder'
import {AppLogger} from './shared/logging/app-logger'
import { createLoggingMiddleware } from './shared/middlewares/logging.middleware'

const setupAppLogger = (config: Config): Logger => {
  const loggerBuilder = LoggerBuilder.create()
    .withLabels([config.get('APP_LOG_LABEL')])
    .withLevel(config.get('APP_LOG_LEVEL') as any)

  const consoleLogger = loggerBuilder
    .withConsole()
    .build()

  const fileLogger = loggerBuilder
    .withFile(config.get('LOG_FILE'))
    .build()

  return AppLogger.create([fileLogger, consoleLogger])
}

@Module({
  imports: [TypeOrmModule.forRoot(EnvConfig.getInstance().getTypeOrmConfig()), CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createLoggingMiddleware(setupAppLogger(EnvConfig.getInstance())))
      .forRoutes('cars')
  }
}
