import { buildMakePerson } from "../../src/js-foundation/05-factory";

describe("js-foundation/05-factory", () => {
  const getUUID = () => "1234";
  const getAge = () => 36;

  test("buildMakePerson return a function", () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson return a person", () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    const person = makePerson({ name: "John", birthdate: "1985-10-21" });

    expect(person).toEqual({
      id: "1234",
      name: "John",
      birthdate: "1985-10-21",
      age: 36,
    });
  });
});
