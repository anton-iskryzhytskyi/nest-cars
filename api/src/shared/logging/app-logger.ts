import { Logger } from './interfaces'

export class AppLogger implements Logger {
  private loggers: Logger[]

  static create(loggers: Logger[]) {
    return new AppLogger(loggers)
  }

  constructor(loggers: Logger[]) {
    this.loggers = loggers
  }

  debug(message: string, data: { [p: string]: any }): void {
    this.loggers.forEach(logger => logger.debug(message, data))
  }

  error(message: string, data: { [p: string]: any }): void {
    this.loggers.forEach(logger => logger.error(message, data))
  }

  info(message: string, data: { [p: string]: any }): void {
    this.loggers.forEach(logger => logger.info(message, data))
  }

}
