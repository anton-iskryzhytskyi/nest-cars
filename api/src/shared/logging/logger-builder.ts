import {Logger, LoggerLevel, LoggerType} from './interfaces'
import {FileLogger} from './file-logger'

export class LoggerBuilder {
  private useConsole: boolean
  private fileName: string
  private level: LoggerLevel
  private labels: string[]
  private type: LoggerType

  public static create(): LoggerBuilder {
    return new LoggerBuilder()
  }

  public withUseConsole(value: boolean): LoggerBuilder {
    this.useConsole = value
    return this
  }

  public withFileName(value: string): LoggerBuilder {
    this.fileName = value
    return this
  }

  public withLevel(value: LoggerLevel): LoggerBuilder {
    this.level = value
    return this
  }

  public withLabels(value: string[]): LoggerBuilder {
    this.labels = value
    return this
  }

  public build(): Logger {
    if (this.type === LoggerType.file && !this.fileName) {
      throw new Error('File name must be set')
    }
    if(this.type === LoggerType.file) {
      return FileLogger.create(
        this.useConsole,
        this.fileName,
        this.level,
        this.labels
      )
    }
  }

  private constructor() {
    this.useConsole = false
    this.fileName = null
    this.level = LoggerLevel.debug
    this.labels = []
    this.type = LoggerType.file
  }

}
