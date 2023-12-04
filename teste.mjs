// // create test
// try {
//     const res = await fetch(new URL('http://localhost:4000/product'), {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: 'Potato'
//         })
//     });

//     console.log(await res.json());
// }
// catch (e) {
//     console.log(e);
// }
import { createPool } from 'mysql2/promise';

const SELECT_QUERY = `SELECT id, 
    login, name, password, document, birth_date, phone, email, postal_code, state, city, neighborhood, street, house_number, complement, about_me
        FROM persons`;

async function findById(userId) {
    if (userId == null)
        return null;
    const db = createPool({
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        connectionLimit: process.env.DB_POOL_LIMIT || 20,
        waitForConnections: true,
        enableKeepAlive: true,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        keepAliveInitialDelay: 0
    });

    const params = [10000];
    const _select = SELECT_QUERY + ' where id = ?';
    try {
        const [[result,],] = await db.execute(_select, params);

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

try {
    findById(109809).then(s => {
        console.log(s);
    }).catch(e => {
        console.log(e);
    })
} catch (error) {

}
