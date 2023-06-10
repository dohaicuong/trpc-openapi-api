import { ENV } from '../config'
import mysql from 'mysql2/promise'
import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'

const poolConnection = mysql.createPool({
  host: ENV.MYSQL_HOST,
  database: ENV.MYSQL_DATABASE,
  user: ENV.MYSQL_USER,
  password: ENV.MYSQL_PASSWORD,
})

export const db = drizzle(poolConnection)

export const migration = () => migrate(db, { migrationsFolder: './migrations' })
