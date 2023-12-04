import { createPool } from "mysql2/promise";


const db = {
    configure() {
        global.dbPool = createPool({
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
    }
};

export default db;
