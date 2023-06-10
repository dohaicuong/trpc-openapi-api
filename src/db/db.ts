import { createPool } from 'mysql2'
import { Kysely, MysqlDialect, Generated } from 'kysely'
import Pool from 'mysql2/typings/mysql/lib/Pool'

type PostTable = {
  id: Generated<number>
  title: string
  content: string
}

export type Database = {
  post: PostTable
}

export const createDBPool = (options: Pool.PoolOptions) =>
  new Kysely<Database>({
    dialect: new MysqlDialect({
      pool: createPool(options),
    }),
  })
