# grpc-web

Rust gRPC server with built‑in gRPC‑Web support and a TypeScript (Vite) browser client. This repo shows an end‑to‑end setup where the browser talks to a Rust backend over gRPC‑Web without needing Envoy, thanks to `tonic-web`.

## What’s inside

- `protos/grpc-web.proto` – shared Protocol Buffers definitions
- `rust/grpc-web-server/` – gRPC server implemented in Rust using tonic + tonic‑web
- `web/grpc-web-client/` – Vite + TypeScript client that calls the server via gRPC‑Web

Services provided (from the proto and server):

- Echo: send a message and receive it back
- Math: perform add/subtract/multiply/divide via a `do_math` RPC

## Prerequisites

- Rust 1.70+
- Node.js 18+ and npm
- Protocol Buffer compiler (`protoc`)
- gRPC‑Web protoc plugin (`protoc-gen-grpc-web`)
  - macOS (Homebrew): `brew install protobuf protoc-gen-grpc-web`

## Quick start

1. Start the Rust gRPC‑Web server (default listens on http://0.0.0.0:10000)

```sh
cd rust/grpc-web-server
cargo run
```

2. Install client deps and generate stubs (only needed if proto changed) and run the client (Vite on http://localhost:8080)

```sh
cd web/grpc-web-client
npm install
npm run proto-regen   # or npm run proto-gen if you don’t need a clean
npm run dev
```

Open http://localhost:8080 and try Echo and Calculator. The client calls the server at http://localhost:10000 using gRPC‑Web. CORS is enabled on the server for local development.

## Development workflow

- Update shared messages/services in `protos/grpc-web.proto`.
- Rebuild the Rust server (build.rs will re‑generate Rust types via prost/tonic‑build).
- Re‑generate client code in `web/grpc-web-client` with `npm run proto-regen`.

## Production

- Server: build a release binary

```sh
cd rust/grpc-web-server
cargo build --release
```

- Client: build static assets to `dist/`

```sh
cd web/grpc-web-client
npm run build
```

Serve the client’s `dist/` behind your preferred static file server or CDN. Point it at the deployed server URL with gRPC‑Web enabled (and appropriate CORS/TLS in front if needed).

## Docs for subprojects

- Rust server: see `rust/grpc-web-server/README.md`
- Web client: see `web/grpc-web-client/README.md`

## Troubleshooting

- protoc or plugin not found: ensure `protoc` and `protoc-gen-grpc-web` are installed and on PATH.
- CORS errors in the browser: verify the server is running on `:10000` and CORS is permissive for the dev origin `http://localhost:8080`.
- Proto not found: confirm `protos/grpc-web.proto` exists and paths in scripts match.

## License

This project is licensed under the terms of the `LICENSE` file in the repository root.
