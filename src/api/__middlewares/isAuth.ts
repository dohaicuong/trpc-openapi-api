import { t } from '../builder'
import { TRPCError } from '@trpc/server'

export type IsAuthOptions = {
  userRoles: JwtUserRole[]
  accountRoles: JwtAccountRole[]
}
export const isAuth = ({ userRoles, accountRoles }: IsAuthOptions) =>
  t.middleware(async ({ ctx, next }) => {
    const auth = ctx.req.headers.authorization

    const isBearerToken = auth?.startsWith('Bearer ')
    if (!isBearerToken) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const jwt = auth?.replace('Bearer ', '')
    if (!jwt) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const jwtPayload = decodeJwt(jwt)
    if (jwtPayload.name === 'DecodeJwtFailed') {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    const user = jwtPayload.payload.object.content
    const checkingRolesNeeded =
      userRoles.length !== 0 && accountRoles.length !== 0
    const hasSufficientUserRoles = userRoles.some((role) =>
      user.roles.includes(role),
    )
    const hasSufficientAccountRoles = user.accounts.some((account) => {
      // also checking request portalID vs account.portal_id ??
      return accountRoles.some((role) => account.roles.includes(role))
    })
    if (
      checkingRolesNeeded &&
      !hasSufficientUserRoles &&
      !hasSufficientAccountRoles
    ) {
      throw new TRPCError({ code: 'FORBIDDEN' })
    }

    const jwtOutput = {
      token: jwt,
      payload: jwtPayload.payload,
    }
    return next({
      ctx: {
        ...ctx,
        jwt: jwtOutput,
      },
    })
  })

export type DecodeJwtFailed = {
  name: 'DecodeJwtFailed'
  message: string
}

export type DecodeJwtSuccess = {
  name: 'DecodeJwtSuccess'
  payload: Go1JwtPayload
}

export type DecodeJwtPayload = DecodeJwtFailed | DecodeJwtSuccess

export const decodeJwt = (jwt: string): DecodeJwtPayload => {
  const [_header, encoded_payload] = jwt.split('.')
  if (!encoded_payload)
    return {
      name: 'DecodeJwtFailed',
      message: 'Invalid jwt token',
    }

  const string_payload = Buffer.from(encoded_payload, 'base64').toString(
    'ascii',
  )

  try {
    const jwtPayload = JSON.parse(string_payload) as Go1JwtPayload
    return {
      name: 'DecodeJwtSuccess',
      payload: jwtPayload,
    }
  } catch (error) {
    return {
      name: 'DecodeJwtFailed',
      message: `error parsing jwt payload, ${error}`,
    }
  }
}

export type Go1JwtPayload = {
  iss: 'go1.access'
  ver: string
  exp: number
  sid: string
  sub: string
  iat: number
  usedCreds: 0 | 1
  object: {
    type: string
    content: JwtUser
  }
}

export type JwtUser = {
  id: number
  instance: string
  profile_id: number
  name: string
  roles: JwtUserRole[]
  mail: string
  accounts: JwtAccount[]
}
export type JwtUserRole = 'Admin on #Accounts' | 'developer'

export type JwtAccount = {
  id: number
  instance: string
  profile_id: number
  name: string
  roles: JwtAccountRole[]
  portal_id: number
  partner_portal_id: number
  ulid: string
}
export type JwtAccountRole =
  | 'administrator'
  | 'content administrator'
  | 'tutor'
  | 'manager'
  | 'Student'
