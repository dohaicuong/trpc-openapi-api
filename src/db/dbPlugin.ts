import fp from 'fastify-plugin'
import { createDBPool } from './db'
import { createMigrator } from './migrations'
import { SERVICE } from '../config'

export const dbPlugin = fp(
  () => {
    const db = createDBPool({
      host: 'localhost',
      port: 3306,
      database: SERVICE.name,
    })
    const migrator = createMigrator(db)

    /// will do migration here

    // if success, log tables created
    // inject db instance to server and to trpc context

    // if failed, log error
    // clean up migration
    // shut down server
  },
  { name: 'db-plugin' },
)
