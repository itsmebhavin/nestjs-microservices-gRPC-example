
import { ClientGrpc } from '@nestjs/microservices';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { GreeterClient, HelloReply, GREETER_SERVICE_NAME } from './greet.pb';
import { Observable } from 'rxjs';

@Controller('greeter')
export class GreetController  implements OnModuleInit {
    private svc: GreeterClient;
    @Inject(GREETER_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void{
        this.svc = this.client.getService<GreeterClient>(GREETER_SERVICE_NAME);
    }

    @Get(':name')
    async SayHello(@Param('name') name: string ): Promise<Observable<HelloReply>>{
        console.log(name);
        return await this.svc.sayHello({name});

    }
}
