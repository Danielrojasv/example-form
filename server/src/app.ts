import * as bodyParser from "body-parser";
import { Server } from "./controllers/server.controller";
import index from "./routes/index.route";
import landing from "./routes/landing.route";

let port = parseInt( process.env.PORT ) || 3000;

const server = Server.init( port );

server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Method','OPTIONS, GET, POST, PUT, DELETE');

    if( 'OPTIONS' == req.method ){
        res.sendStatus(200);
    } else {
        console.log(`${ req.ip } ${ req.method } ${ req.url } `);
        next();
    }
});

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));

server.app.use('/', index);
server.app.use('/landing', landing);


server.start(() => console.log(`Server started in port ${ port }`));