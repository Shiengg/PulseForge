# PulseForge

A microservices-based backend scaffold built with Docker Compose. An Nginx API gateway
routes and rate-limits traffic to backend services, starting with a `user-auth` service.

## Architecture

```
                ┌──────────────┐        ┌──────────────┐
  Client ──────▶│ api-gateway  │───────▶│  user-auth   │
                │  (nginx)     │        │  (Express)   │
                └──────────────┘        └──────────────┘
```

- **api-gateway** — Nginx reverse proxy (`api-gateway/nginx.conf`) that exposes port `8080`,
  proxies `/auth/*` requests to the `user-auth` service, and applies per-IP rate limiting
  (10 req/s general zone, 5 req/s on the auth zone).
- **user-auth** — Express service (`services/user-auth`) exposing `GET /` and
  `GET /api/v1/health`, running on port `4001` inside the Docker network.
- **monitoring**, **worker-service**, **load-tester** — reserved directories for upcoming
  services; not yet implemented.

## Prerequisites

- Docker and Docker Compose
- `make` (optional, wraps the Docker Compose commands below)

## Getting started

```bash
make up      # build and start all services in the background
make logs    # tail logs from all containers
make ps      # list running containers
make down    # stop all services
make reset   # stop, remove volumes/orphans, then rebuild and start
```

Equivalent raw commands are in the [Makefile](Makefile) if you prefer not to use `make`.

Once running, the gateway is available at `http://localhost:8080`, e.g.:

```bash
curl http://localhost:8080/auth/api/v1/health
```

## Project structure

```
.
├── api-gateway/           # Nginx reverse proxy config
│   └── nginx.conf
├── services/
│   ├── user-auth/         # Express auth service
│   ├── worker-service/    # reserved
│   └── load-tester/       # reserved
├── monitoring/            # reserved
├── docker-compose.yml
├── Makefile
└── .github/workflows/     # CI (GitHub Actions)
```

## CI/CD

GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs on pushes and
pull requests targeting `main` and `develop`: it installs dependencies and syntax-checks
the `user-auth` service, then reports the build status to a Discord channel via webhook.

## License

[MIT](LICENSE) © 2026 Tran Nhat Tan
