FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY server.js ./
COPY src ./src

EXPOSE 4001

CMD ["pnpm", "start"]
