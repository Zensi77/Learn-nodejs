export class CreateTodoDto {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { id, text, completedAt } = props;

    if (!text || text.length === 0) {
      return ["Title is required", undefined];
    }

    return [undefined, new CreateTodoDto(text)];
  }
}
