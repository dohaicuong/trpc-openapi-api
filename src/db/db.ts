import { Kysely, MysqlDialect } from 'kysely'
import { Database } from './schema'
import { ENV } from '../config'
import mysql from 'mysql2/promise'

export const poolConnection = mysql.createPool({
  host: ENV.MYSQL_HOST,
  database: ENV.MYSQL_DATABASE,
  user: ENV.MYSQL_USER,
  password: ENV.MYSQL_PASSWORD,
})

export const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool: poolConnection,
  }),
})
