/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "greet";

/** The request message containing the user's name. */
export interface HelloRequest {
  name: string;
}

/** The response message containing the greetings. */
export interface HelloReply {
  message: string;
}

export const GREET_PACKAGE_NAME = "greet";

/** The greeting service definition. */

export interface GreeterClient {
  /** Sends a greeting */

  sayHello(request: HelloRequest): Observable<HelloReply>;
}

/** The greeting service definition. */

export interface GreeterController {
  /** Sends a greeting */

  sayHello(
    request: HelloRequest
  ): Promise<HelloReply> | Observable<HelloReply> | HelloReply;
}

export function GreeterControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("Greeter", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("Greeter", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const GREETER_SERVICE_NAME = "Greeter";

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
