import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura'],
    },
    deps: {
      inline: ['default-composer'],
    }
  },
})
