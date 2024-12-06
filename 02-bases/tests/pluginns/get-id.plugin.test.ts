import { getUUID } from "../../src/plugins/get-id.plugin";

describe("getUUID", () => {
  it("should return a string", () => {
    const result = getUUID();
    expect(typeof result).toBe("string");
    expect(result.length).toBe(36);
  });
});
