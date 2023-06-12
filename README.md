## Getting start

#### Install dependencies
```
pnpm i
```

#### Setup local env
```
cp .env.example .env
```
change the env value in `.env` if needed

#### Start up db and run migration
```
docker compose up -d
npx prisma migrate dev
```

#### Starting server
```
pnpm dev
```

## Testing
change the env value in `.env.test` if needed
```
// watching
pnpm test

// with web ui
pnpm test:ui

// test coverage
pnpm coverage
```

## Environment variable
more environment variables that lived on k8s pod
- QA: https://code.go1.com.au/domain-infrastructure/k8s/config-map/-/blob/master/qa.config.k8s.yaml
- PROD: https://code.go1.com.au/domain-infrastructure/k8s/config-map/-/blob/master/prod.config.k8s.yaml
