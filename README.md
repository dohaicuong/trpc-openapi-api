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