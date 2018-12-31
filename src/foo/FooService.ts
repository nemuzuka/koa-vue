/**
 * Service の interface サンプル.
 */
import { Foo } from "./Foo";

export interface FooService {
  /**
   * get 処理
   * @param id ID
   * @return 処理結果
   */
  get(id: String): string;

  /**
   * create 処理.
   * @param body 登録情報
   * @return 処理結果
   */
  create(body: any): Promise<string>;

  /**
   * Foo の Create.
   * @param foo 登録情報
   * @return 登録済情報
   */
  createFoo(foo: Foo): Promise<Foo>;
}
