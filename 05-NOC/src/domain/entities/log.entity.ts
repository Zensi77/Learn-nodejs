export enum LogServerityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface logEntityOptions {
  level: LogServerityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

// Entidad que representa un log
export class LogEntity {
  level: LogServerityLevel;
  message: string;
  createdAt: Date;
  origin: string;

  constructor(option: logEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = option;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { level, message, createdAt, origin } = JSON.parse(json);
    const log = new LogEntity({
      level,
      message,
      origin,
    });
    log.createdAt = new Date(createdAt);
    return log;
  };

  // [key: string]: any para indicar que el objeto puede tener cualquier cantidad de propiedades y que el nombre de estas propiedades es un string
  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createdAt, origin } = object;
    const log = new LogEntity({
      level,
      message,
      origin,
    });

    return log;
  };
}
