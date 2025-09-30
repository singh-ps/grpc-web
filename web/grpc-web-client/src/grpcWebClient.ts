import { GrpcWebServiceClient } from "./generated/Grpc-webServiceClientPb";
import { EchoRequest, Operation, MathRequest } from "./generated/grpc-web_pb";

export default class GrpcWebClient {
    private client: GrpcWebServiceClient;

    constructor(baseUrl: string = "http://localhost:10000") {
        this.client = new GrpcWebServiceClient(baseUrl);
    }

    async echo(message: string): Promise<string> {
        try {
            const request = new EchoRequest();
            request.setMessage(message);
            const response = await this.client.echo(request);
            return response.getMessage();
        } catch (error) {
            console.error("gRPC-Web Echo error:", error);
            throw error;
        }
    }

    async math(operation: Operation, number1: number, number2: number): Promise<number> {
        try {
            const request = new MathRequest();
            request.setOperation(operation);
            request.setNumber1(number1);
            request.setNumber2(number2);
            const response = await this.client.doMath(request);
            return response.getResult();
        } catch (error) {
            console.error("gRPC-Web Math error:", error);
            throw error;
        }
    }
}
