export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  // DI -> Dependency Injection
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let data = "";
    for (let i = 0; i <= limit; i++) {
      data += `${base} * ${i} = ${base * i}`;
      i < limit ? (data += "\n") : (data += "");
    }

    return data;
  }
}
