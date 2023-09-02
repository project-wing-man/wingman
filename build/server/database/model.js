"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.PG_URI = exports.pool = void 0;
const pg_1 = require("pg");
const PG_URI = 'postgres://kgjjdogg:FvzspKAjb5pdoXK2pwal95f9ZFjn_cC-@batyr.db.elephantsql.com/kgjjdogg';
exports.PG_URI = PG_URI;
const pool = new pg_1.Pool({
    connectionString: PG_URI
});
exports.pool = pool;
const query = (text, params) => {
    console.log('executed query', text);
    return new Promise((resolve, reject) => {
        pool.query(text, params, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.query = query;
//# sourceMappingURL=model.js.map