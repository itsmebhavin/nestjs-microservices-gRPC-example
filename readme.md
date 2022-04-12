<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">gRPC Microservices</h3>
  <h6>nestjs-microservices-gRPC-example</h6>
  
  <p align="center">
    gRPC Microservices example using nest.js and asp.net core microservices and nest.js based gateway API to consume in client app.
    <br />
    <a href="https://github.com/itsmebhavin/nestjs-microservices-gRPC-example"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/issues">Report Bug</a>
    ·
    <a href="https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Micorservices example using gRPC. Two microservices written in nest.js and ASP.NET Core using gRPC. Both of them connect to the gateway API (written in nest.js) using common **proto** file interfaces. No need to install Redis or RabbitMQ etc. as communication happen on RPC.

### Why gRPC?

gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.

### Why nest.js?
NestJS is a framework for building efficient, scalable Node.js web applications. It uses modern JavaScript and is built with TypeScript. If you develop an API built with TypeScript, then NestJS is the way to go! It’s heavily inspired by Spring and Angular.

### What is an API Gateway?
An API gateway is an entry point for all clients, in our case, for all client requests based on HTTP, but it doesn’t need to be limited to HTTP only. The API gateway handles requests in one of two ways. Some requests are simply proxied/routed to the appropriate service. It handles other requests by fanning out to multiple services

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Nest.js](https://docs.nestjs.com/microservices/grpc)
* [gRPC](https://grpc.io/)
* [ProtoBuf](https://github.com/protocolbuffers/protobuf)
* [gRPC on .NET](https://docs.microsoft.com/en-us/aspnet/core/grpc/?view=aspnetcore-6.0)
* [Visual Studio Code](https://code.visualstudio.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here is the outline we are going to do - 
  1. Common proto folder with **proto** files
  2. nest.js microservice
  3. .NET core microservice
  4. nest.js gateway

### Proto folder

***grpc-nest-proto***
```
$ cd grpc-nest-proto
$ npm init --y
$ git init
$ mkdir proto
$ touch proto/book.proto && touch proto/greet.proto
$ code .
```
Now we have the proto folder and two files book.proto and greet.proto available. We are going to use book.proto in nest.js microservice and greet.proto in .NET Core microservice. 

```
//book.proto
syntax = "proto3";

package book;

service BookService {
    rpc getBooks (getBooksRequest) returns (getBooksResponse) {}
    rpc getBookById (getBookByIdRequest) returns (getBookByIdResponse) {}
}

// getBooks
message getBooksRequest{

}
message getBooksResponse {
    repeated Book books = 1;
}

message Book {
    int32 id =1;
    string title = 2;
    string description = 3;
    string author = 4;   
}

// getBookById

message getBookByIdRequest {
    int32 id = 1;
}

message getBookByIdResponse {
    Book book =1;
}
```
Book.proto has two methods to implement. getBooks and getBookById. 

```
// Greet.proto
syntax = "proto3";

option csharp_namespace = "aspnetcore_api";

package greet;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply);
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings.
message HelloReply {
  string message = 1;
}
```
 Greet.proto will be used in .NET core microservice and it has one method to just greet hello {message}

**Package.json** 
We have to install some dependencies to compile these two proto files into pure *.ts file so that our gateway API can understand these contracts.(i.e. methods)

```
npm install @nestjs/microservices
npm install rxjs
npm install ts-proto
```

We are also going to add some scripts to compile the files. 

```
"proto:book": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=../grpc-nest-proto/proto --ts_proto_out=src/book/ ../grpc-nest-proto/proto/book.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
"proto:greet": "protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=../grpc-nest-proto/proto --ts_proto_out=src/greet/ ../grpc-nest-proto/proto/greet.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb",
"proto:all": "npm run proto:book && npm run proto:greet"
```
**NOTE:**
If you see some issues running these script and compiling your proto files, then you can download [proto compiler](https://github.com/protocolbuffers/protobuf/releases) and compile your files. 
```
// here is how i run this commmand in windows powershell 
>$nestjs-microservice-gRPC\grpc-nest-proto> ..\protoc-3.20.0-win64\bin\protoc.exe --plugin=./node_modules/.bin/protoc-gen-ts_proto.cmd  --ts_proto_out=./build ./proto/*.proto  --ts_proto_opt=nestJs=true  --ts_proto_opt=fileSuffix=.pb
```


### nest.js microservice

ok, so now we have proto files (i.e. contracts) ready to start with. We are going to make our first microservice using nest.js.

***grpc-nest-book-svc***
```
$ cd grpc-nest-book-svc
$ code .
$ npm i @nestjs/microservices @grpc/grpc-js @grpc/proto-loader @nestjs/typeorm typeorm pg class-transformer class-validator
$ npm i -D @types/node ts-proto
$ nest g mo book && nest g co book --no-spec && nest g s book --no-spec
```
Now, let's start with bootstrapping- 

***main.ts***
```
async function bootstrap() {
  const app = await NestFactory.createMicroservice(BookModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      protoPath: './../grpc-nest-proto/proto/book.proto',
      package: 'book',
    },
  });

  // tslint:disable-next-line: no-console
   app.listen();
}
```
***books.mocks.ts***

Add dummy mock data for books - [mock books data](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/blob/master/grpc-nest-book-svc/src/books.mock.ts)

***book.controller.ts***

```
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GrpcMethod('BookService','getBooks')
  @Get()
  async getBooks(getBooksRequest): Promise<getBooksResponse> {
    return { books: await this.bookService.getBooks() }
  }

  @GrpcMethod('BookService','getBookById')
  @Get(':id')
  async getBookById(id:number): Promise<getBookByIdResponse> {
    return {book: await this.bookService.getBookById(id)}
  }
}
```

***book.service.ts***
```
import { getBooksResponse,Book } from '../../grpc-nest-proto/build/proto/book.pb';
import { Injectable, HttpException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BOOKS } from './books.mock';

@Injectable()
export class BookService {
  books = BOOKS;
  
  getBooks(): Promise<Book[]> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }

  getBookById(param): Promise<Book> {
    
    console.log(param);
    return new Promise(resolve => {
      const book = this.books.find($book => $book.id === param.id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }
}
```
***Build and Run this microservice***
```
npm run start:dev
```

***Testing using Postman***
![Book service testing](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/blob/master/grpc-nest-book-svc/images/bookservicetesting.png)



<p align="right">(<a href="#top">back to top</a>)</p>


### ASP.NET Core microservice
***prerequisite***

[C# for VSCode -optional if you use .NET IDE](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)

[.NET 6.0 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)

***Create new project***
```
dotnet new grpc -o aspnetcore-api
dotnet dev-certs https --trust
```

Here is how we are going to use our **SayHello** contract from greet.proto file
```
public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        return Task.FromResult(new HelloReply
        {
            Message = "Hello " + request.Name
        });
    }
```
***Important files to check or take a look***
```
Program.cs
Appsettings.json
proto/greet.proto (same as our generic grpc-nest-proto folder. You can even refer it from there)
```

***Testing using Postman***
![Greet service testing](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/blob/master/aspnetcore-api/images/greetservicetesting.png)


<p align="right">(<a href="#top">back to top</a>)</p>


### nest.js API Gateway

API Gateway is going to communicate with both of our microservices. It will be regular http based API which will handle request and responses to/from these microservices. It will use gRPC communication channel to talk to these microservices.

Gateway will have two sub-module
- Book
  - controller.ts'
    - This will have basic request and response middle man method
  - module.ts
    - This is where we are going to consume that nest.js book service on grpc channel
  - book.pb.ts (compiled book.proto file)
- Greet
  - controller.ts
  - module.ts
    - This is where we are going to consume that asp.net greet service on grpc channel
  - greet.pb.ts (compiled greet.proto file)


***Testing using Postman***
![Greet service testing](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/blob/master/grpc-nest-api-gateway/images/greetservicetesting.png)

![Book service testing](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example/blob/master/grpc-nest-api-gateway/images/bookservicetesting.png)


<!-- resources -->
## Resources
* https://docs.nestjs.com/microservices/grpc#sample-grpc-service
* https://levelup.gitconnected.com/nestjs-microservices-with-grpc-api-gateway-and-authentication-part-1-2-650009c03686
* https://levelup.gitconnected.com/nestjs-microservices-with-grpc-api-gateway-and-authentication-part-2-2-d67dc8e3b86a
* https://mariobuonomo.dev/blog/tutorial-nestjs-microservices-grpc
* https://medium.com/effective-development/building-grpc-api-in-nest-with-typescript-95e1915abc15
  
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Bhavin Patel

[Wordpress](http://itsmebhavin.wordpress.com/) - [LinkedIn](https://www.linkedin.com/in/bhavin-patel-55691310/)

Project Link: [https://github.com/itsmebhavin/nestjs-microservices-gRPC-example](https://github.com/itsmebhavin/nestjs-microservices-gRPC-example)

<p align="right">(<a href="#top">back to top</a>)</p>



