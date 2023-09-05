const supertest = require('supertest');
const app = require('../index');


// test('La URL de productos debe ser 200', async() => {
//     await supertest(app)
//     .get('/productos')
//     .expect(200)
 
// });

test('El endpoint debe retornar un JSON', async()=> {
    await supertest(app)
    .get('/productos-json')
    .expect(200)
    .then((response) => {
               
        expect(response.headers["content-type"]).toEqual(
            "application/json; charset=utf-8" 
        );
    })
});


test('El endpoint debe retornar un array de longitud 3', async() =>{
    await supertest(app)
    .get('/productos-json')
    .expect(200)
    .then((response) => {
        expect(response.headers["content-type"]).toEqual(
            "application/json; charset=utf-8" 
        );
        expect(response.body).toHaveLength(3);
    })
});


test('El array en la posicion 0 debe tener id = 1', async() =>{
    await supertest(app)
    .get('/productos-json')
    .expect(200)
    .then((response) => {
        expect(response.headers["content-type"]).toEqual(
            "application/json; charset=utf-8" 
        );
        expect(response.body[0]).toHaveProperty("id", 1);
    })
});


test('El array en la ultima posicion debe tener id = 3', async() =>{
    await supertest(app)
    .get('/productos-json')
    .expect(200)
    .then((response) => {
        const longitud = response.body.length;
        console.log("longitud", longitud);
        console.log(response.body[longitud -1]); 

        expect(response.headers["content-type"]).toEqual(
            "application/json; charset=utf-8" 
        );
        expect(response.body[longitud -1]).toHaveProperty("id", 3);
    })
});