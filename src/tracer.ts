import tracer from 'dd-trace'
import { ENV } from './config'

tracer.init({
  env: ENV.ENV,
})
