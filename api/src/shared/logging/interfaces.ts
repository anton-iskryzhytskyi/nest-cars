export interface Logger {
  debug: (message: string, data: { [k: string]: any }) => void;
  info: (message: string, data: { [k: string]: any }) => void;
  error: (message: string, data: { [k: string]: any }) => void;
}

export enum LoggerLevel {
  debug,
  info,
  error
}

export enum LoggerType {
  // only one options for now
  file
}
