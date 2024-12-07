export class UpdateTodoDto {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObject: { [key: string]: any } = {};
    if (this.text) {
      returnObject.text = this.text;
    }
    if (this.completedAt) {
      returnObject.completedAt = this.completedAt;
    }

    return returnObject;
  }

  static create(props: {
    [key: string]: any;
  }): [string | undefined, UpdateTodoDto | undefined] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(id)) {
      return ["ID id not valid", undefined];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        return ["Invalid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
