import { getUserById } from '../../src/js-foundation/03-callbacks';


describe('getUserById', () => {
    test('Shoild return an error message if user is not found', (done) => {
        const id = 3;
        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
            done(); // Indica que el callback ha finalizado y que el test ha terminado
        });
    });
    test('Should return a user', (done) => { 
        const id = 1;
        getUserById(id, (err, user) => {
            expect(err).toBeNull();
            expect(user).toEqual({ id: 1, name: 'John Doe' });
            done();
        });
    });
});