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

  create(body: any): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(`body: ${JSON.stringify(body)}`);
      const response = {
        hoge: "abc",
        hige: 1234,
        hage: "元気でやってますよ"
      };
      resolve(JSON.stringify(response));
    });
  }
}
