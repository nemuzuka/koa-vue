import * as request from "supertest";
import { FooService } from "../../foo/FooService";
import * as sut from "../../App";
import { FooFixtures } from "../../__fixtures__/foo/FooFixtures";

/**
 * FooController の UnitTest.
 *
 * <p>
 * Service を Mock に差し替えて Controller を呼びます
 * </p>
 */
describe("FooController の UnitTest.", () => {
  it("create の 正常系 Test.", async () => {
    // setup
    // mock 対象は Promise を返すので mockResolvedValue
    const fooServiceMock = jest.fn<FooService>(() => ({
      create: jest.fn().mockResolvedValue("hoge")
    }));
    // mock object に差し替え
    sut.container
      .rebind<FooService>("FooService")
      .toConstantValue(new fooServiceMock());

    // execute
    const response = await request(sut.koa.callback())
      .post("/foo")
      .send({ username: "hoge", password: "hage" });
    expect(response.status).toBe(201);
    expect(response.text).toBe("hoge");
  });

  it("create の 異常系 Test.", async () => {
    // setup
    // mock 対象は Promise を返すので mockRejectedValue
    const fooServiceMock = jest.fn<FooService>(() => ({
      create: jest.fn().mockRejectedValue(new Error("hige"))
    }));
    // mock object に差し替え
    sut.container
      .rebind<FooService>("FooService")
      .toConstantValue(new fooServiceMock());

    // execute
    const response = await request(sut.koa.callback())
      .post("/foo")
      .send({ username: "hoge", password: "hage" });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"error":"hige"}');
  });

  it("index の パラメータ有り", done => {
    // setup
    // mock 対象は string を返すので mockReturnValue
    const fooServiceMock = jest.fn<FooService>(() => ({
      get: jest.fn().mockReturnValue("sage")
    }));
    // mock object に差し替え
    sut.container
      .rebind<FooService>("FooService")
      .toConstantValue(new fooServiceMock());

    // execute
    // Mock を使用するので パラメータ関係なく、固定の文字列をレスポンスする
    request(sut.koa.callback())
      .get("/foo?id=hoge")
      .expect(200)
      .expect("sage", done);
  });

  it("createFoo の 正常系 Test.", async () => {
    // setup
    // mock 対象は Promise を返すので mockResolvedValue
    const fooServiceMock = jest.fn<FooService>(() => ({
      createFoo: jest.fn().mockResolvedValue(FooFixtures.create())
    }));
    // mock object に差し替え
    sut.container
      .rebind<FooService>("FooService")
      .toConstantValue(new fooServiceMock());

    // execute
    const response = await request(sut.koa.callback())
      .post("/foo/_by-admin")
      .send({
        title: "タイトルですよねー！",
        text: "まぁ、helloかもね",
        rating: 3,
        email: "admin@example.com",
        site: "hoge.example.com",
        createDate: null
      });
    expect(response.status).toBe(201);
    expect(response.text).toBe(JSON.stringify(FooFixtures.create()));
  });

  it("createFoo の validate エラー", async () => {
    // execute
    const response = await request(sut.koa.callback())
      .post("/foo/_by-admin")
      .send({
        title: "タイトル",
        text: "まぁ、helloかもね",
        rating: 3,
        email: "admin@example.com",
        site: "hoge.example.com",
        createDate: null
      });
    expect(response.status).toBe(400);
    const responseObject = JSON.parse(response.text);
    expect(responseObject.error).toBe("Invalid request.");
    expect(responseObject.errors.length).toBe(1);
    expect(responseObject.errors[0].constraints.length).toBe(
      "title は 10 以上 20 の長さで指定してください。"
    );
  });

  it("createFoo の 異常系 Test.", async () => {
    // setup
    // mock 対象は Promise を返すので mockRejectedValue
    const fooServiceMock = jest.fn<FooService>(() => ({
      createFoo: jest.fn().mockRejectedValue(new Error("yeah"))
    }));
    // mock object に差し替え
    sut.container
      .rebind<FooService>("FooService")
      .toConstantValue(new fooServiceMock());

    // execute
    const response = await request(sut.koa.callback())
      .post("/foo/_by-admin")
      .send({
        title: "タイトルですよねー！",
        text: "まぁ、helloかもね",
        rating: 3,
        email: "admin@example.com",
        site: "hoge.example.com",
        createDate: null
      });
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"error":"yeah"}');
  });
});
