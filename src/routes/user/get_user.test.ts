import { describe, it, expect } from 'vitest'

import { app } from '../../app'
import { signTestJwt } from '../../_test_helpers'

describe('GET /user', () => {
  it('should return user data from jwt', async () => {
    const validJwt = signTestJwt()

    const res = await app.inject({
      method: 'GET',
      url: '/api/user',
      headers: {
        authorization: `Bearer ${validJwt}`
      }
    })
    const payload = await res.json()

    expect(payload.id).toBe(1)
    expect(payload.name).toBe('Some One')
    expect(payload.mail).toBe('someone@portal.go1.com')
    expect(payload.roles).toStrictEqual(['Admin on #Accounts'])
  })

  it('should throw 401 error when no jwt send', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/user',
    })
    
    const data = await res.json()

    expect(res.statusCode).toBe(401)
    expect(data.message).toBe('UNAUTHORIZED')
    expect(data.code).toBe('UNAUTHORIZED')
  })

  it('should throw error when jwt is invalid', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/user',
      headers: {
        authorization: 'Bearer invalid_jwt'
      }
    })

    const data = await res.json()

    expect(res.statusCode).toBe(401)
    expect(data.message).toBe('UNAUTHORIZED')
    expect(data.code).toBe('UNAUTHORIZED')
  })

})
