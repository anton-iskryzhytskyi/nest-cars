import { Logger, LoggerLevel, LoggerType } from './interfaces'
import { StreamLogger } from './stream-logger'
import { createWriteStream } from "fs"
import { Writable } from "stream"

export class LoggerBuilder {
  private writeStream: Writable
  private level: LoggerLevel
  private labels: string[]
  private type: LoggerType

  public static create(): LoggerBuilder {
    return new LoggerBuilder()
  }

  public withConsole(): LoggerBuilder {
    this.writeStream = process.stdout
    return this
  }

  public withFile(value: string): LoggerBuilder {
    this.writeStream = createWriteStream(value,{ flags: 'a' })
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
    return StreamLogger.create(
      this.writeStream,
      this.level,
      this.labels
    )
  }

  private constructor() {
    this.writeStream = process.stdout
    this.level = 'debug'
    this.labels = []
    this.type = LoggerType.file
  }

}
