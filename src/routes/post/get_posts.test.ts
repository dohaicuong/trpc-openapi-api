import { describe, it, expect, beforeEach } from 'vitest'

import { app } from '../../app'
import { signTestJwt } from '../../tests/signTestJwt'
import { dbMock } from '../../tests/dbMock'
import { Post, PrismaPromise } from '@prisma/client'

import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from '../router'

type Payload = inferRouterOutputs<AppRouter>['get_posts']

const validJwt = signTestJwt()
const now = new Date()
const posts: Post[] = Array.from({ length: 100 }).map((_, index) => ({
  id: `POST:${index + 1}`,
  author_id: index,
  title: 'title',
  content: 'content',
  createdAt: now,
  updatedAt: now,
}))

describe('[GET /posts] get_posts', () => {
  beforeEach(() => {
    dbMock.post.findMany.mockImplementation(({ take, skip }: any) => {
      return posts.slice(skip, skip + take) as unknown as PrismaPromise<Post[]>
    })
  })

  it('should return empty array if no data', async () => {
    dbMock.post.findMany.mockReturnValue([] as unknown as PrismaPromise<Post[]>)
    const res = await app.inject({
      method: 'GET',
      url: '/api/posts',
      headers: {
        authorization: `Bearer ${validJwt}`,
      },
    })
    const payload: Payload = await res.json()

    expect(payload).toHaveLength(0)
  })

  it('should return correct pagination data', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/posts?limit=20&offset=25',
      headers: {
        authorization: `Bearer ${validJwt}`,
      },
    })
    const payload: Payload = await res.json()

    expect(payload).toHaveLength(20)
    expect(payload[0]).toMatchObject({
      id: 'POST:26',
      title: 'title',
      content: 'content',
      author_id: 25,
    })
    expect(payload[payload.length - 1]).toMatchObject({
      id: 'POST:45',
      title: 'title',
      content: 'content',
      author_id: 44,
    })
  })

  it('should return correct pagination data if no limit, offset is passed', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/posts',
      headers: {
        authorization: `Bearer ${validJwt}`,
      },
    })
    const payload: Payload = await res.json()

    expect(payload).toHaveLength(50)
    expect(payload[0]).toMatchObject({
      id: 'POST:1',
      title: 'title',
      content: 'content',
      author_id: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    })
    expect(payload[payload.length - 1]).toMatchObject({
      id: 'POST:50',
      title: 'title',
      content: 'content',
      author_id: 49,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    })
  })

  it('should throw error if take more than maximum limit', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/posts?limit=101',
      headers: {
        authorization: `Bearer ${validJwt}`,
      },
    })
    const payload = await res.json()

    expect(payload.message).toBe('Input validation failed')
    expect(payload.code).toBe('BAD_REQUEST')
    expect(payload.issues[0].message).toBe(
      'Number must be less than or equal to 100',
    )
  })
})
