import { Kysely } from 'kysely'
import { Database } from '../db'

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('post')
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('content', 'varchar(255)', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('post').execute()
}
