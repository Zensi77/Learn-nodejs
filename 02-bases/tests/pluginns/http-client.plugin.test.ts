import { httpClientPlugin } from "../../src/plugins/http-client.plugin";

describe("httpClientPlugin", () => {
  test("return a string", (done) => {
    httpClientPlugin
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((data) => {
        expect(data).toEqual({
          userId: 1,
          id: 1,
          title: "delectus aut autem",
          completed: expect.any(Boolean), // Espera um booleano
        });
        done();
      });
  });

  test("Test PUT, POST and DELETE", () => {
    expect(typeof httpClientPlugin.post).toBe("function");
    expect(typeof httpClientPlugin.put).toBe("function");
    expect(typeof httpClientPlugin.delete).toBe("function");
  });
});
