import * as express from "express";
import * as AWS from "aws-sdk";


export class Server{
    public app = express.application;

    constructor(private port: number){
        this.app = express();
    }

    start(callback: Function){
        this.app.listen( this.port, callback);
        AWS.config.update({
            //define keys
            region: 'us-east-2'
        });
    }

    static init(port:number): Server{
        return new Server(port)
    }
}