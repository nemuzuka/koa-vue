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
import { Foo } from "./Foo";

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
      console.log(err);
      res.status = 400;
      res.body = { error: err.message };
    }
  }

  /**
   * post アクセス.
   * @param req Request
   * @param res Response
   */
  @httpPost("/_by-admin")
  private async createFoo(
    @request() req: Koa.Request,
    @response() res: Koa.Response
  ) {
    try {
      const foo = Foo.valueOf(req.body);
      const errors = await foo.validate();
      if (errors.length > 0) {
        res.status = 400;
        res.body = JSON.stringify({
          errors,
          error: "Invalid request."
        });
        return;
      }
      res.body = await JSON.stringify(await this.fooService.createFoo(foo));
      res.status = 201;
    } catch (err) {
      console.log(err);
      res.status = 400;
      res.body = { error: err.message };
    }
  }
}
