import * as bodyParser from "koa-bodyparser";

import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import { Kernel } from "./Kernel";

// set up container
let container = new Kernel();

// create server
let server = new InversifyKoaServer(container);
server.setConfig(app => {
  // add body parser
  app.use(bodyParser());
});

const PORT: number = Number(process.env.PORT) || 3000;
server.build().listen(PORT);
