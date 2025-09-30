import GrpcWebClient from "./grpcWebClient";
import { Operation } from "./generated/grpc-web_pb";

async function testEcho() {
    const client = new GrpcWebClient();
    console.log("Sending echo request...");
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