/* eslint-disable no-undef */
import { Writable } from 'stream'
import { Logger, LoggerLevel } from './interfaces'


export class StreamLogger implements Logger {
  private readonly isDebugEnabled: boolean
  private readonly isInfoEnabled: boolean

  private readonly labels: string[]
  private readonly writeStream: Writable

  public static create(fileStream: Writable, level: LoggerLevel, labels: string[]) {
    return new StreamLogger(fileStream, level, labels)
  }

  public debug(message, data) {
    if (this.isDebugEnabled) { this.log('debug', message, data) }
  }

  public info(message, data) {
    if (this.isInfoEnabled) {
      this.log('info', message, data)
    }
  }

  public error(message, data) {
    this.log('error', message, data)
  }

  private constructor(writeStream: Writable, level: LoggerLevel, labels: string[]) {
    this.isDebugEnabled = level === 'debug'
    this.isInfoEnabled = level === 'debug' || level === 'info'

    this.labels = labels
    this.writeStream = writeStream
  }

  private writeToStream(log: string) {
    this.writeStream.write(`${log}\n`, 'utf8', (err) => {
      if (!err) { return }
      console.log('Write to stream failed', err)
    })
  }

  private log(level: LoggerLevel, message: string, data: { [k: string]: any }) {
    const log =
      `level:${level};labels:${this.labels.join('|')};message:${message};data:${JSON.stringify(data)}`

    this.writeToStream(log)
  }
}
