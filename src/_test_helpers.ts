import { Go1JwtPayload } from './routes/_middlewares/isAuth'

export const signTestJwt = (test_payload?: Partial<Go1JwtPayload>): string => {
  const payload: Go1JwtPayload = {
    iss: 'go1.access',
    ver: 'string',
    exp: 1,
    sid: 'string',
    sub: 'string',
    iat: 0,
    usedCreds: 0,
    ...test_payload,
    object: {
      type: 'user',
      ...test_payload?.object,
      content: {
        id: 1,
        instance: 'portal.go1.com',
        profile_id: 1,
        name: 'Some One',
        mail: 'someone@portal.go1.com',
        roles: test_payload?.object?.content.roles || ['Admin on #Accounts'],
        accounts: test_payload?.object?.content.accounts || [
          {
            id: 1,
            ulid: 'ascnimwof1',
            instance: 'portal.go1.com',
            profile_id: 1,
            name: 'Some One',
            roles: ['administrator'],
            partner_portal_id: 0,
            portal_id: 1,
          },
        ],
        ...test_payload?.object?.content,
      },
    },
  }

  const string_payload = JSON.stringify(payload)
  const string64_payload = Buffer.from(string_payload, 'ascii').toString(
    'base64',
  )

  return ['jwt_header', string64_payload, 'jwt_secret'].join('.')
}
