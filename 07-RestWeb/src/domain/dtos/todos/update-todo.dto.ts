export class UpdateTodoDto {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date | null
  ) {}

  /**
   * Genera un objeto con los valores que se van a actualizar.
   */
  get values() {
    const returnObject: { [key: string]: any } = {};
    if (this.text !== undefined) {
      returnObject.text = this.text;
    }
    if (this.completedAt !== undefined) {
      returnObject.completedAt = this.completedAt;
    }
    return returnObject;
  }

  /**
   * Método estático para crear una instancia del DTO.
   */
  static create(props: {
    id: any; // Puede ser un string o número inicialmente
    text?: string;
    completedAt?: any; // Puede ser string, Date o null
  }): [string | undefined, UpdateTodoDto | undefined] {
    const { id, text, completedAt } = props;

    // Validar el ID
    const numericId = Number(id);
    if (!numericId || isNaN(numericId)) {
      return ["ID is not valid", undefined];
    }

    // Validar el campo completedAt si está presente
    let parsedCompletedAt: Date | null = null;
    if (completedAt !== undefined) {
      parsedCompletedAt = new Date(completedAt);
      if (isNaN(parsedCompletedAt.getTime())) {
        return ["Invalid completedAt date", undefined];
      }
    }

    // Crear y devolver el DTO
    return [undefined, new UpdateTodoDto(numericId, text, parsedCompletedAt)];
  }
}
