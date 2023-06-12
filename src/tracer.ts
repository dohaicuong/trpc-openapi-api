import tracer from 'dd-trace'
import { ENV } from './config'

if (ENV.NODE_ENV !== 'test' && ENV.ENV !== 'local') {
  tracer.init({
    env: ENV.ENV,
  })
}
