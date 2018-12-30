import {
  interfaces,
  controller,
  httpGet,
  httpPost,
  response,
  request
} from "inversify-koa-utils";
import { injectable, inject } from "inversify";
import * as Router from "koa-router";
import * as Koa from "koa";
import { FooService } from "./FooService";

/**
 * Controller のサンプル.
 */
@controller("/foo")
@injectable()
export class FooController implements interfaces.Controller {
  constructor(@inject("FooService") private fooService: FooService) {}

  /**
   * index アクセス.
   * @param ctx Context
   */
  @httpGet("/")
  private index(ctx: Router.IRouterContext): string {
    return this.fooService.get(ctx.query.id);
  }

  /**
   * post アクセス.
   * @param req Request
   * @param res Response
   */
  @httpPost("/")
  private async create(
    @request() req: Koa.Request,
    @response() res: Koa.Response
  ) {
    try {
      res.body = await this.fooService.create(req.body);
      res.status = 201;
    } catch (err) {
      res.status = 400;
      res.body = { error: err.message };
    }
  }
}
