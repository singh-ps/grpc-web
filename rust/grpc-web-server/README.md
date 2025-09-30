# gRPC Web Server (Rust)

A high-performance gRPC web server built with Rust, featuring gRPC-Web compatibility for browser-based clients.

## Features

- **gRPC-Web Support**: Enables gRPC communication from web browsers
- **HTTP/1.1 Compatibility**: Accepts both HTTP/1.1 and HTTP/2 connections
- **CORS Enabled**: Configured with permissive CORS for cross-origin requests
- **Async/Await**: Built on Tokio for high-performance async operations
- **Protocol Buffers**: Type-safe message serialization with Prost

## Services

The server implements the following gRPC services:

### Echo Service

- **Method**: `echo`
- **Description**: Returns the input message back to the client
- **Use Case**: Testing connectivity and basic functionality

### Math Service

- **Method**: `do_math`
- **Description**: Performs mathematical operations (add, subtract, multiply, divide)
- **Operations Supported**:
  - Addition
  - Subtraction
  - Multiplication
  - Division (with zero-division protection)

## Prerequisites

- Rust 1.70+
- Protocol Buffer compiler (`protoc`)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd grpc-web-server
```

2. Build the project:

```bash
cargo build
```

## Usage

### Starting the Server

Run the server with:

```bash
cargo run
```

The server will start on `0.0.0.0:10000` and accept both gRPC and gRPC-Web connections.

### Client Connections

#### gRPC Client (Native)

Connect directly using any gRPC client on port 10000.

#### gRPC-Web Client (Browser)

Use the gRPC-Web protocol from browsers. The server handles the translation between gRPC-Web and native gRPC.

Example JavaScript client setup:

```javascript
const client = new GrpcWebServiceClient("http://localhost:10000");
```

## Project Structure

```
src/
├── main.rs          # Application entry point
├── server.rs        # Server configuration and startup
├── controller.rs    # gRPC service implementations
└── models.rs        # Generated Protocol Buffer types
build.rs             # Build script for proto compilation
Cargo.toml           # Dependencies and project metadata
```

## Dependencies

### Runtime Dependencies

- **tonic**: gRPC implementation for Rust
- **tonic-web**: gRPC-Web support
- **tonic-reflection**: gRPC server reflection
- **tokio**: Async runtime
- **tower-http**: HTTP middleware (CORS)
- **prost**: Protocol Buffer implementation

### Build Dependencies

- **tonic-build**: Code generation from proto files
- **prost-build**: Protocol Buffer code generation

## Configuration

### Server Address

The server binds to `0.0.0.0:10000` by default. Modify the `ADDR` constant in `src/server.rs` to change the binding address.

### CORS Policy

Currently configured with permissive CORS. For production, consider restricting CORS to specific origins in `src/server.rs`.

## Protocol Buffer Schema

The server expects a `grpc-web.proto` file located at `../../protos/grpc-web.proto` relative to the project root during build time.

## Development

### Building

```bash
cargo build
```

### Running in Development

```bash
cargo run
```

## Production Deployment

1. Build with optimizations:

```bash
cargo build --release
```

2. The binary will be available at `target/release/grpc-web-server`

3. Consider using a reverse proxy (nginx, Envoy) for production deployments to handle TLS termination and load balancing.

## Troubleshooting

### Common Issues

1. **Proto file not found**: Ensure the proto file exists at `../../protos/grpc-web.proto`
2. **Port already in use**: Change the port in `ADDR` constant or kill the process using port 10000
3. **CORS errors**: Check browser console for CORS-related issues; the server uses permissive CORS by default
