# Build
FROM node:22.12.0-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime
FROM node:22.12.0-bookworm-slim
WORKDIR /app

ENV NODE_ENV=production
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "build"]

