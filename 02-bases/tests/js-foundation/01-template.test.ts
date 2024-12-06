import { emailTemplate } from "../../src/js-foundation/01-template";

describe("js-foundation/01-template", () => {
  test("Email template should contain the correct data", () => {
    expect(emailTemplate).toContain("Hi, ");
  });
    
  test("emailTemplate should container {{name}} and {{orderId}}", () => {
    expect(emailTemplate).toContain("{{name}}");
    expect(emailTemplate).toContain("{{orderId}}");
  });
});
