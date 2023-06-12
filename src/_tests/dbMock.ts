import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { vi, beforeEach } from 'vitest'

import { db } from '../db'

vi.mock('../db', () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(dbMock)
})

export const dbMock = db as unknown as DeepMockProxy<PrismaClient>
