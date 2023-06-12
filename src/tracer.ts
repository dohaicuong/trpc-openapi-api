import tracer from 'dd-trace'
import { ENV } from './config'

if (ENV.DD_ENV !== 'local') {
  tracer.init({
    env: ENV.ENV,
  })
}
