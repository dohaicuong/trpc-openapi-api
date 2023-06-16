[X] development
  - [X] .env, .env parsing
  - [X] dev server
  - [X] database access
    - [X] docker compose
    - [X] prisma
    - [ ] prisma-kysely

[X] testing
  - [X] .env.test
  - [X] with vitest, vitest ui
  - [X] test coverage

[X] Quality of life
  - [X] rome linter, formatter
  - [X] post-install dependency hook to setup git hook
  - [X] lint stage format pre-commit
  - [ ] logging
    - [X] setup logging
    - [ ] find out if we got go1 standard logging format (another topic) 
      - [ ] (winston)
  - [X] datadog
  - [ ] auto checking dependencies
    - [ ] renovate bot

[ ] deployment
  - [ ] gitlab ci
  - [ ] service health check
    - liveness and readiness
    - https://code.go1.com.au/domain-authentication/access/-/blob/master/src/infrastructure/healthCheck.controller.ts
  - [X] migration (handled in CD)

[ ] design docs
  intro
    needs more info
    more concise using BLUF https://en.wikipedia.org/wiki/BLUF_(communication)
  add information in the doc about only using this new stuff for new apps, not existing ones
  focus on the purpose of establishing a new option instead
