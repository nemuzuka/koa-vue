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
}
