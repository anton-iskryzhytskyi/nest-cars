/* eslint-disable no-undef */
import { createWriteStream, WriteStream } from 'fs'
import { Logger, LoggerLevel } from './interfaces'


export class FileLogger implements Logger {
  private readonly useConsole: boolean
  private readonly isDebugEnabled: boolean
  private readonly isInfoEnabled: boolean

  private readonly labels: string[]
  private readonly fileStream: WriteStream

  public static create(useConsole: boolean, fileName: string, level: LoggerLevel, labels: string[]) {
    return new FileLogger(useConsole, fileName, level, labels)
  }

  public debug(message, data) {
    if (this.isDebugEnabled) { this.log(LoggerLevel.debug, message, data) }
  }

  public info(message, data) {
    if (this.isInfoEnabled) {
      this.log(LoggerLevel.info, message, data)
    }
  }

  public error(message, data) {
    this.log(LoggerLevel.error, message, data)
  }

  private constructor(useConsole: boolean, fileName: string, level: LoggerLevel, labels: string[]) {
    this.useConsole = useConsole
    this.isDebugEnabled = level === LoggerLevel.debug
    this.isInfoEnabled = level === LoggerLevel.debug || level === LoggerLevel.info

    this.labels = labels
    this.fileStream = createWriteStream(fileName, { flags: 'a' })
  }

  private writeToFile(log: string) {
    this.fileStream.write(`${log}\n`, 'utf8', (err) => {
      if (!err) { return }
      console.log('Write log to file failed', err)
    })
  }

  private log(level: LoggerLevel, message: string, data: { [k: string]: any }) {
    const log =
      `level:${level};labels:${this.labels.join('|')};message:${message};data:${JSON.stringify(data)}`

    this.writeToFile(log)

    if (this.useConsole) {
      console.log(log)
    }
  }
}
