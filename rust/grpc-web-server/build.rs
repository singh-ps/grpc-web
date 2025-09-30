use prost_build::Config;

fn main() {
    let protos = ["grpc-web.proto"];

    let config = Config::new();

    tonic_build::configure()
        .build_client(false)
        .compile_protos_with_config(config, &protos, &["../../protos"])
        .unwrap_or_else(|e| panic!("Failed to compile protos! {:?}", e));
}
