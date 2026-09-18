FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY services/user-auth/package.json ./services/user-auth/package.json
RUN pnpm install --frozen-lockfile

COPY services/user-auth/prisma ./services/user-auth/prisma
RUN pnpm --filter user-auth exec prisma generate
RUN pnpm install --frozen-lockfile

COPY services/user-auth/server.js ./services/user-auth/server.js
COPY services/user-auth/src ./services/user-auth/src

WORKDIR /app/services/user-auth

EXPOSE 4001

CMD ["pnpm", "start"]
