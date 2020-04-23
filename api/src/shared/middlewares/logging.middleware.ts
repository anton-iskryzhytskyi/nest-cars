import { Request, Response } from 'express'
import { Logger } from '../logging/interfaces'

export const createLoggingMiddleware = (logger: Logger) => (req: Request, res: Response, next: Function) => {
  const { query, method, path, params } = req
  const startTs = Date.now()

  logger.debug('request - start', { query, method, path, params, startTs })

  res.on('finish', () => {
    const endTs = Date.now()

    logger.debug(
      'request - start',
      { query, method, path, params, startTs, endTs, durationMs: endTs - startTs },
    )
  })

  next()
}
