#!/usr/bin/env bash
set -euo pipefail

echo "Generating gRPC-Web"

OUT_DIR="./src/generated"
PROTO_DIR="../../protos"
PROTOC_GEN_ES_PATH="./node_modules/.bin/protoc-gen-es"

# Find include dir for google/protobuf/*.proto
if [[ -d "/opt/homebrew/include/google" ]]; then
  INC_DIR="/opt/homebrew/include"
elif [[ -d "/usr/local/include/google" ]]; then
  INC_DIR="/usr/local/include"
else
  INC_DIR="$(dirname "$(command -v protoc)")/../include"
fi

# Sanity
command -v protoc >/dev/null || { echo "protoc not on PATH"; exit 1; }

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

protoc \
  -I="$PROTO_DIR" \
  -I="$INC_DIR" \
  --plugin="protoc-gen-es=${PROTOC_GEN_ES_PATH}" \
  --es_out="${OUT_DIR}" \
  --es_opt=target=ts \
  --grpc-web_out="import_style=typescript,mode=grpcweb:${OUT_DIR}" \
  grpc-web.proto

echo "Done. Files in $OUT_DIR:"
ls -la "$OUT_DIR"
