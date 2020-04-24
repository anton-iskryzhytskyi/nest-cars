import { Injectable, NestMiddleware } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
import { Request, Response } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: Function) {
    const startTs = Date.now()
    const { query, method, path, params } = req

    this.logger.debug({ query, method, path, params, startTs }, LoggingMiddleware.name)

    res.on('finish', () => {
      const endTs = Date.now()

      this.logger.debug(
        { query, method, path, params, startTs, endTs, durationMs: endTs - startTs },
        LoggingMiddleware.name
      )
    })

    next()
  }
}
