/**
 * Service の interface サンプル.
 */
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
}
