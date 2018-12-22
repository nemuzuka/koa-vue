import { FooService } from "./FooService";
import { injectable } from "inversify";

/**
 * FooService の実装クラス.
 * <p>
 * public なメソッドは、FooService のメソッドだけ
 * </p>
 */
@injectable()
export class FooServiceImpl implements FooService {
  get(id: string) {
    return `hello:${id}`;
  }
}
