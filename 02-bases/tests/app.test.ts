import exp from "constants"

describe('App', () => {
    test('should be true', () => {
        // 1. Arrange - set up the test
        // expect(true).toBe(true)
        const num1 = 1
        const num2 = 2

        // 2. Act - execute the test
        const result = num1 + num2

        // 3. Assert - check the results
        expect(result).toBe(3)
    })
})