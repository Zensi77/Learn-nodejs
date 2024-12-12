export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt; // !! converts to boolean
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, text, completedAt } = object;
    if (!id || !text) {
      throw new Error("Invalid object");
    }

    let newDate = null;
    if (completedAt) {
      newDate = new Date(completedAt);
      if (isNaN(newDate.getTime())) {
        throw new Error("Invalid date");
      }
    }

    return new TodoEntity(id, text, newDate);
  }
}
