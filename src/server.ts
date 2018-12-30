import * as bodyParser from "koa-bodyparser";

import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import { Kernel } from "./Kernel";

// set up container
const CONTAINER = new Kernel();
const SERVE = require("koa-static");

// create server
const server = new InversifyKoaServer(CONTAINER);
server.setConfig(app => {
  // add body parser
  app.use(bodyParser());
  // static file
  app.use(SERVE(`${__dirname}/../vue-public`));
});

const PORT: number = Number(process.env.PORT) || 3000;
server.build().listen(PORT);
