import { mysqlTable, varchar, text, serial, int } from 'drizzle-orm/mysql-core'
import { Kyselify } from 'drizzle-orm/kysely'

export type Database = {
  posts: Kyselify<typeof posts_table>
}

export const posts_table = mysqlTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  author_id: int('author_id').notNull(),
})
