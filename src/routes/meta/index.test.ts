import { describe, it, expect } from 'vitest'

import { app } from '../../app'

describe('GET /', () => {
  it('should return service meta data', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/',
    })
    const payload = await res.json()

    expect(payload.service).toBe('trpc-openapi-api')
    expect(payload.version).toBeDefined()
    expect(payload.env).toBe('local')
    expect(payload.time).toBeDefined()
  })
})
