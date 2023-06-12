import { z } from 'zod'
import service from '../package.json'

const ServiceSchema = z.object({
  name: z.string(),
  version: z.string(),
})
export const SERVICE = ServiceSchema.parse(service)

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'staging', 'production']),
  ENV: z.enum(['local', 'staging', 'production']),
  DD_VERSION: z.string().default('0000000'),
  DD_ENV: z.enum(['local', 'k8s-qa', 'k8s-prod']),
  HOST: z.string(),
  PORT: z.preprocess(
    (str) => (typeof str === 'string' ? parseInt(str) : str),
    z.number(),
  ),
  // GATEWAY_URL: z.string(),
  // SERVICE_URL_PATTERN: z.string(), // http://SERVICE.k8s-qa
  // AVAILABLE_GO1_REGIONS: z.preprocess(
  //   str => typeof str === 'string' ? str.split(',') : str,
  //   z.array(z.enum(['australiaeast', 'northeurope', 'centralus']))
  // ),
})
export const ENV = EnvironmentSchema.parse(process.env)
