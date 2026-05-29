# grpc-web

A Rust gRPC server with built-in gRPC-Web support and a TypeScript browser client. This repo demonstrates an end-to-end setup where the browser calls a Rust backend over gRPC-Web without needing Envoy, thanks to `tonic-web`.

## What's inside

- `protos/grpc-web.proto` — shared Protocol Buffers definitions
- `rust/grpc-web-server/` — gRPC server in Rust using `tonic` + `tonic-web`
- `web/grpc-web-client/` — Vite + TypeScript browser client using [Connect](https://connectrpc.com)

Services (from the proto):

- **Echo** — send a message and receive it back
- **DoMath** — add, subtract, multiply, or divide two numbers

## Prerequisites

- Rust 1.70+
- Node.js 18+ and npm

No `protoc` or other system proto tools required — the client uses `buf` (installed via npm).

## Quick start

**1. Start the Rust server** (listens on `http://0.0.0.0:10000`)

```sh
cd rust/grpc-web-server
cargo run
```

**2. Start the web client** (served on `http://localhost:8080`)

```sh
cd web/grpc-web-client
npm install
npm run dev
```

Open `http://localhost:8080` and try Echo and Calculator.

## Development workflow

- Edit shared proto definitions in `protos/grpc-web.proto`.
- The Rust server regenerates its types automatically via `build.rs` on `cargo build`.
- Regenerate the TypeScript client stubs with `npm run proto-regen` in `web/grpc-web-client/`.

## Production build

**Server:**

```sh
cd rust/grpc-web-server
cargo build --release
```

**Client:**

```sh
cd web/grpc-web-client
npm run build
```

Serve the `dist/` folder from any static file server or CDN, pointed at the deployed server URL.

## Subproject docs

- Rust server: `rust/grpc-web-server/README.md`
- Web client: `web/grpc-web-client/README.md`

## Troubleshooting

- **CORS errors in the browser** — verify the server is running on `:10000` with CORS enabled for `http://localhost:8080`.
- **Proto not found** — confirm `protos/grpc-web.proto` exists and `buf.gen.yaml` paths are correct.

## License

Licensed under the terms of the `LICENSE` file in the repository root.
