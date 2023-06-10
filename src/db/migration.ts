import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'
import { ENV } from '../config'

export const migration = async () => {
  const connection = await mysql.createConnection({
    host: ENV.MYSQL_HOST,
    database: ENV.MYSQL_DATABASE,
    user: ENV.MYSQL_USER,
    password: ENV.MYSQL_PASSWORD,
  })

  const db = drizzle(connection)
  return migrate(db, { migrationsFolder: './migrations' })
}
