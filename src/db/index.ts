import { createPool } from 'mysql2'
import { Kysely, MysqlDialect } from 'kysely'
import { DB } from './types'
import { ENV } from '../config'

export const db = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: ENV.MYSQL_HOST,
      database: ENV.MYSQL_DATABASE,
      user: ENV.MYSQL_USER,
      password: ENV.MYSQL_PASSWORD,
    }),
  }),
})
