import * as bodyParser from "koa-bodyparser";

import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import { Kernel } from "./Kernel";

// set up container
const container = new Kernel();
const serve = require("koa-static");

// create server
const server = new InversifyKoaServer(container);
server.setConfig(app => {
  // add body parser
  app.use(bodyParser());
  // static file
  app.use(serve(`${__dirname}/../vue-public`));
});

const koa = server.build();
export = koa;
