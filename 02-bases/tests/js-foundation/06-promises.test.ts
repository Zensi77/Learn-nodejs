import { getPokemonById } from "../../src/js-foundation/06-promises";

describe("js-foundation/06-promises", () => {
  test("getPokemonById", async () => {
    const pokemonName = await getPokemonById(1);
    expect(pokemonName).toBe("bulbasaur");
  });

  test("Pokemon not found", async () => {
    try {
      await getPokemonById(10000);
    } catch (error) {
      expect(error.message).toBe("Pokemon no existe");
    }
  });
});
