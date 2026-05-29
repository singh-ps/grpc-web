# gRPC-Web Client (Vite + TypeScript)

A minimal browser client demonstrating gRPC calls with a small UI (Echo and Calculator) built with Vite + TypeScript.

The client talks to a gRPC-Web endpoint (default `http://localhost:10000`) using the [Connect](https://connectrpc.com) browser transport, which is compatible with gRPC-Web servers like `tonic-web`.

## Features

- **Echo** — send a message and get it back from the server, with a short history.
- **Calculator** — pick an `Operation` (add/subtract/multiply/divide) and two numbers; shows result or error.
- Native ESM throughout — no CommonJS, no post-generation patching.
- Proto stubs generated via [`buf`](https://buf.build) and [`protoc-gen-es`](https://github.com/bufbuild/protobuf-es).

## Project layout

```
src/
  index.ts              # UI wiring
  grpcWebClient.ts      # Connect client wrapper
  generated/            # Generated from proto (do not edit)
buf.gen.yaml            # Buf code generation config
index.html              # Echo + Calculator UI
vite.config.ts
tsconfig.json
package.json
```

## Prerequisites

- Node.js 18+ and npm
- A running gRPC-Web compatible server at `http://localhost:10000` (see `rust/grpc-web-server/`)

No `protoc` or other system tools required — `buf` is installed as an npm dev dependency.

## Install

```sh
npm install
```

## Generate client code from proto

Cleans `src/generated/` and regenerates TypeScript stubs from `../../protos/grpc-web.proto`.

```sh
npm run proto-regen
```

To regenerate without cleaning first:

```sh
npm run proto-gen
```

## Run in development

```sh
npm run dev
```

Opens on `http://localhost:8080`. Ensure the gRPC-Web server is running on `http://localhost:10000`.

## Build for production

```sh
npm run build
```

Regenerates proto stubs, type-checks with `tsc`, and bundles to `dist/`.

## How code generation works

[`buf.gen.yaml`](buf.gen.yaml) configures `buf generate` to run `protoc-gen-es` against `../../protos/`, outputting native ESM TypeScript into `src/generated/`. The Connect transport in `grpcWebClient.ts` uses the generated `GrpcWebService` descriptor directly — no separate generated service client file needed.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on `:8080` |
| `npm run build` | Regenerate protos, type-check, bundle to `dist/` |
| `npm start` | Build then serve |
| `npm run proto-gen` | Run `buf generate` |
| `npm run proto-regen` | Clean + `buf generate` |
| `npm run clean` | Remove `dist/` and `src/generated/` |

## Troubleshooting

- **TypeScript cannot find generated types** — run `npm run proto-regen` to ensure `src/generated/` exists.
- **CORS errors in the browser** — verify the server is running on `:10000` with CORS enabled for `http://localhost:8080`.
