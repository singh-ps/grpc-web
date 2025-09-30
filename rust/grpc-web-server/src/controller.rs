use crate::models::{
    grpc_web_service_server::GrpcWebService, EchoRequest, EchoResponse, MathRequest, MathResponse,
    Operation,
};
use tonic::{async_trait, Request, Response, Status};

pub struct GrpcWebController {}

#[async_trait]
impl GrpcWebService for GrpcWebController {
    async fn echo(&self, request: Request<EchoRequest>) -> Result<Response<EchoResponse>, Status> {
        let message = request.into_inner().message;
        let response = EchoResponse { message };
        Ok(Response::new(response))
    }

    async fn do_math(
        &self,
        request: Request<MathRequest>,
    ) -> Result<Response<MathResponse>, Status> {
        let req = request.into_inner();

        let operation = Operation::try_from(req.operation)
            .map_err(|_| Status::invalid_argument("Invalid operation in request"))?;

        let result = match operation {
            Operation::Add => req.number1 + req.number2,
            Operation::Subtract => req.number1 - req.number2,
            Operation::Multiply => req.number1 * req.number2,
            Operation::Divide => {
                if req.number2 == 0.0 {
                    return Err(Status::invalid_argument("Division by zero"));
                }
                req.number1 / req.number2
            }
        };

        Ok(Response::new(MathResponse { result }))
    }
}
