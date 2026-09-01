FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
RUN npm i -g pnpm && pnpm install --filter api...
COPY . .
RUN pnpm --filter api build
EXPOSE 3001
CMD ["pnpm", "--filter", "api", "start:prod"]
