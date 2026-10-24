# Node 24 is the Maintenance LTS line with security support; the pinned Alpine
# variants keep every stage on the same musl ABI.
FROM node:24.22.1-alpine3.24 AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:24.22.1-alpine3.24 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Minimal runtime: Alpine plus the Node binary only. npm, npx, corepack, yarn
# and the rest of the toolchain never reach the final image.
FROM alpine:3.24.3 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Node 24 musl binary links against libstdc++.so.6 and libgcc_s.so.1
# (checked with ldd); libstdc++ brings libgcc with it. libatomic is not needed.
RUN apk add --no-cache libstdc++ \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /usr/local/bin/node /usr/local/bin/node
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Node ships global fetch, so the probe does not depend on wget/curl.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server.js"]
