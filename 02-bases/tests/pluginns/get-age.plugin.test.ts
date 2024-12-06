import exp from "constants";
import { getAge } from "../../src/plugins";

describe("getAge", () => {
  it("should return the age of a person", () => {
    expect(getAge("1990-01-01")).toBe(31);
  });

  // Espias
  test("Should return 0 years", () => {
    // Cambia el valor que retorna el metodo getFullYear de Date
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1995);

    const birthdate = "1995-01-01";
    const result = getAge(birthdate); // Aqui se ejecuta el getFullYear mockeado
    expect(result).toBe(0); // Aqui se compara el resultado
    expect(spy).toHaveBeenCalled(); // Aqui se verifica que se haya llamado al metodo
    expect(spy).toHaveBeenCalledWith(); // Aqui se verifica que se haya llamado al metodo con los argumentos correctos
  });
});
