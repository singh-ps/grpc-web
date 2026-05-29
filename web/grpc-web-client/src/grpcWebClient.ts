import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { GrpcWebService } from "./generated/grpc-web_pb";
import { Operation } from "./generated/grpc-web_pb";

export { Operation };

export default class GrpcWebClient {
    private client: ReturnType<typeof createClient<typeof GrpcWebService>>;

    constructor(baseUrl: string = "http://localhost:10000") {
        const transport = createGrpcWebTransport({ baseUrl });
        this.client = createClient(GrpcWebService, transport);
    }

    async echo(message: string): Promise<string> {
        try {
            const response = await this.client.echo({ message });
            return response.message;
        } catch (error) {
            console.error("Echo error:", error);
            throw error;
        }
    }

    async math(operation: Operation, number1: number, number2: number): Promise<number> {
        try {
            const response = await this.client.doMath({ operation, number1, number2 });
            return response.result;
        } catch (error) {
            console.error("Math error:", error);
            throw error;
        }
    }
}
