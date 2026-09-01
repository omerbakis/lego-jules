FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/worker/package.json apps/worker/
RUN npm i -g pnpm && pnpm install --filter worker...
COPY . .
RUN pnpm --filter worker build
CMD ["pnpm", "--filter", "worker", "start"]
