import { FooFixtures } from "../../__fixtures__/foo/FooFixtures";
import { Foo } from "../../foo/Foo";

describe("Foo の UnitTest.", () => {
  it("validate 呼び出しでエラーが存在しない", async () => {
    // setup
    const sut = FooFixtures.create();

    // execute
    const actuals = await sut.validate();

    // verify
    expect(actuals.length).toBe(0);
  });

  it("validate 呼び出しで title のエラーが存在する", async () => {
    // setup
    const sut = new Foo(
      "id_1234",
      "hoge",
      "hello world",
      6,
      "hoge@example.com",
      "www.example.com",
      new Date("2019-01-03")
    );

    // execute
    const actual = await sut.validate();

    // verify
    expect(actual.length).toBe(1);
    expect(actual[0].constraints.length).toBe(
      "title は 10 以上 20 の長さで指定してください。"
    );
  });

  it("validate 呼び出しで複数のエラーが存在する", async () => {
    // setup
    const sut = new Foo(
      "id_1234",
      "hige",
      "hell world",
      11,
      "hoge@example_.com",
      "www._example.com",
      new Date()
    );

    // execute
    const actual = await sut.validate();

    // verify
    expect(actual.length).toBe(5);

    const actualMessages = actual.reduce((previousValue, value) => {
      const constraints = value.constraints;
      for (const key in constraints) {
        previousValue.push(constraints[key]);
      }
      return previousValue;
    }, []);
    expect(actualMessages).toContain("rating は 10 以下で指定してください。");
    expect(actualMessages).toContain(
      "title は 10 以上 20 の長さで指定してください。"
    );
    expect(actualMessages).toContain("text は hello を含んでください。");
    expect(actualMessages).toContain("email は email 形式で指定してください。");
    expect(actualMessages).toContain("site は FDQN 形式で指定してください。");
  });

  it("valueOf の正常系テスト(プロパティが存在する)", async () => {
    // setup
    const body = {
      id: "foo-bar",
      title: "title-ABCD",
      text: "hello world!",
      rating: 3,
      email: "hige@example.com",
      site: "app.example.com",
      createDate: new Date("2019-01-01")
    };

    // execute
    const actual = Foo.valueOf(body);

    // verify
    const expected = new Foo(
      actual.id,
      body.title,
      body.text,
      body.rating,
      body.email,
      body.site,
      body.createDate
    );
    expect(actual).toEqual(expected);
  });

  it("valueOf の正常系テスト(プロパティが存在しない)", async () => {
    // setup
    const body = {};

    // execute
    const actual = Foo.valueOf(body);

    // verify
    const expected = new Foo(actual.id, null, null, null, null, null, null);
    expect(actual).toEqual(expected);
  });

  it("valueOf の引数にプロパティの型違いが渡されたが validate で検知する", async () => {
    // setup(Date型に不正な文字列)
    const body = {
      title: "title-ABCD",
      text: "hello world!",
      rating: 3,
      email: "hige@example.com",
      site: "app.example.com",
      createDate: "hoge"
    };

    // execute
    const actual = await Foo.valueOf(body).validate();

    // verify
    expect(actual.length).toBe(1);
    expect(actual[0].constraints.isDate).toBe(
      "createDate は 日付形式で指定してください。"
    );
  });
});
