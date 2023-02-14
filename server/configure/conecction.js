const pgPromise = require("pg-promise");

const config = {

    user: 'nyzmdjhwnxgika',
    port: '5432',
    host: 'ec2-34-231-42-166.compute-1.amazonaws.com',
    password: 'bd181ad01262f677990ba73f1e97a4cd1bcbd9d2072e644ac07ca2121286a0c7',
    database: 'd1l7eh1lvtc8dr',
    
    ssl: {
        rejectUnauthorized: false
    }
};

const pgp = pgPromise({})
const db = pgp(config)
exports.db = db