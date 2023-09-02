import { Pool, QueryConfig, QueryResult } from 'pg';

const PG_URI = 'postgres://kgjjdogg:FvzspKAjb5pdoXK2pwal95f9ZFjn_cC-@batyr.db.elephantsql.com/kgjjdogg';

const pool = new Pool({
  connectionString: PG_URI
});

export { pool, PG_URI };

export const query = (
  text: string,
  params: string[]
): Promise<QueryResult> => {
  console.log('executed query', text);
  return new Promise<QueryResult>((resolve, reject) => {
    pool.query(text, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};