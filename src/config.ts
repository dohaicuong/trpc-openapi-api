import { z } from 'zod'
import service from '../package.json'

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  ENV: z.enum(['local', 'k8s-qa', 'k8s-prod']),
  HOST: z.string(),
  PORT: z.preprocess(
    (str) => (typeof str === 'string' ? parseInt(str) : str),
    z.number(),
  ),
  MYSQL_HOST: z.string(),
  MYSQL_DATABASE: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
})
export const ENV = EnvironmentSchema.parse(process.env)

const ServiceSchema = z.object({
  name: z.string(),
  version: z.string(),
})
export const SERVICE = ServiceSchema.parse(service)
