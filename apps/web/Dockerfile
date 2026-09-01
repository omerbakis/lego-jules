FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
RUN npm i -g pnpm && pnpm install --filter web...
COPY . .
RUN pnpm --filter web build
EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]
