import { Container } from "inversify";
import { interfaces } from "inversify-koa-utils";
import { FooServiceImpl } from "./foo/FooServiceImpl";
import { FooService } from "./foo/FooService";
import { FooController } from "./foo/FooController";
import { TYPE } from "inversify-koa-utils";

/**
 * bind 処理.
 *
 * <p>
 * - controller
 * - service
 *
 * の bind する箇所をここで記載します。
 * </p>
 */
export class Kernel extends Container {
  constructor() {
    super();

    // controller / service の bind 処理
    this.bindController();
    this.bindService();
  }

  private bindController() {
    this.bind<interfaces.Controller>(TYPE.Controller)
      .to(FooController)
      .whenTargetNamed("FooController");
  }

  private bindService() {
    this.bind<FooService>("FooService").to(FooServiceImpl);
  }
}
