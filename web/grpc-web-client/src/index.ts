import GrpcWebClient from "./grpcWebClient.js";
import { Operation } from "./generated/grpc-web_pb.js";

async function testEcho() {
    const client = new GrpcWebClient();
    try {
        const response = await client.echo("Hello, gRPC-Web Sending To Server!");
        alert("Echo response: " + response);
    } catch (error) {
        console.error("Error during echo:", error);
    }
}

async function testMath() {
    const client = new GrpcWebClient();
    try {
        const result = await client.math(Operation.ADD, 5, 3);
        alert("Math result: " + result);
    }
    catch (error) {
        console.error("Error during math operation:", error);
    }
}

testEcho();
//testMath();