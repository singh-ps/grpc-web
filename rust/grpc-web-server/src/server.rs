use crate::{controller::GrpcWebController, models::grpc_web_service_server::GrpcWebServiceServer};
use tonic::transport::Server;

const ADDR: &str = "0.0.0.0:10000";

pub(crate) async fn start() -> Result<(), Box<dyn std::error::Error>> {
    let addr = ADDR.parse().unwrap();

    let controller = GrpcWebController {};

    let service = GrpcWebServiceServer::new(controller);

    Server::builder()
        .accept_http1(true)
        .layer(tower_http::cors::CorsLayer::permissive())
        .add_service(tonic_web::enable(service))
        .serve(addr)
        .await?;

    Ok(())
}
