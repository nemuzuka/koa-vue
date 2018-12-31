import {
  Contains,
  IsDate,
  IsEmail,
  IsFQDN,
  IsInt,
  Length,
  Max,
  Min,
  MinLength,
  validate,
  ValidationError
} from "class-validator";
import { v4 as uuid } from "uuid";

/**
 * Foo モデル.
 */
export class Foo {
  constructor(
    id: string,
    title: string,
    text: string,
    rating: number,
    email: string,
    site: string,
    createDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.rating = rating;
    this.email = email;
    this.site = site;
    this.createDate = createDate;
  }

  @MinLength(1)
  readonly id: string;

  @Length(10, 20, {
    message:
      "$property は $constraint1 以上 $constraint2 の長さで指定してください。"
  })
  readonly title: string;

  @Contains("hello", {
    message: "$property は $constraint1 を含んでください。"
  })
  readonly text: string;

  @IsInt({
    message: "$property は 数値で指定してください。"
  })
  @Min(0, {
    message: "$property は $constraint1 以上で指定してください。"
  })
  @Max(10, {
    message: "$property は $constraint1 以下で指定してください。"
  })
  readonly rating: number;

  @IsEmail(
    {},
    {
      message: "$property は email 形式で指定してください。"
    }
  )
  readonly email: string;

  @IsFQDN(
    {},
    {
      message: "$property は FDQN 形式で指定してください。"
    }
  )
  readonly site: string;

  /**
   * memo: Date 型は使うべきではない気がする。
   * UTC のエポックミリ秒の方が間違いないと思うが、テストのために使用する
   */
  @IsDate({
    message: "$property は 日付形式で指定してください。"
  })
  readonly createDate: Date;

  /**
   * validate.
   */
  async validate(): Promise<ValidationError[]> {
    return await validate(this, { skipMissingProperties: true });
  }

  /**
   * パラメータからインスタンスを生成.
   * @param body リクエスト body パラメータ
   * @return 生成インスタンス
   */
  static valueOf<Foo>(body: any) {
    return new Foo(
      uuid(),
      body.hasOwnProperty("title") ? body.title : null,
      body.hasOwnProperty("text") ? body.text : null,
      body.hasOwnProperty("rating") ? body.rating : null,
      body.hasOwnProperty("email") ? body.email : null,
      body.hasOwnProperty("site") ? body.site : null,
      body.hasOwnProperty("createDate") ? new Date(body.createDate) : null
    );
  }
}
