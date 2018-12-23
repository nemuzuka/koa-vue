import { interfaces, controller, httpGet } from "inversify-koa-utils";
import { injectable, inject } from "inversify";
import * as Router from "koa-router";
import { FooService } from "./FooService";

/**
 * Controller のサンプル.
 */
@controller("/foo")
@injectable()
export class FooController implements interfaces.Controller {
  constructor(@inject("FooService") private fooService: FooService) {}

  /**
   * index アクセス
   * @param ctx Context
   */
  @httpGet("/")
  private index(ctx: Router.IRouterContext): string {
    return this.fooService.get(ctx.query.id);
  }
}
