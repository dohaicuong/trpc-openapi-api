FROM node:18

WORKDIR /srv/app/signal
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 80

EXPOSE $PORT

RUN npm install -g pnpm

COPY . .
RUN pnpm i --frozen-lockfile
RUN pnpx prisma generate

CMD pnpm start
