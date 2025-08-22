FROM node:22-slim

RUN apt-get update && apt-get install -y \
    libvips-dev \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod=false

COPY . .

# Load environment variables from .env.prod.local and build
RUN if [ -f .env.prod.local ]; then \
        export $(cat .env.prod.local | grep -v '^#' | xargs) && pnpm build; \
    else \
        echo "Warning: .env.prod file not found, building with defaults" && pnpm build; \
    fi

EXPOSE 8080

# ENV
ENV PORT=8080
ENV NODE_OPTIONS="--max-old-space-size=3072"

# Start the application
CMD ["pnpm", "start"]