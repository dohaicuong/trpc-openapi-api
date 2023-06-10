import { Migrator, FileMigrationProvider, Kysely } from 'kysely'
import { Database } from '../db'
import { promises as fs } from 'fs'
import path from 'path'

export const createMigrator = (db: Kysely<Database>) =>
  new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: './',
    }),
  })
