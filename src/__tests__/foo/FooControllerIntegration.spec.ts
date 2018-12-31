import * as request from "supertest";
import * as sut from "../../App";

/**
 * FooController の IntegrationTest.
 *
 * <p>
 * 一通りの処理をテストするケースです。
 * </p>
 */
describe("FooController の IntegrationTest.", () => {
  it("GET /foo の パラメータ無し", done => {
    request(sut.koa.callback())
      .get("/foo")
      .expect(200)
      .expect("hello:undefined", done);
  });

  it("GET /foo の パラメータ有り", done => {
    request(sut.koa.callback())
      .get("/foo?id=hoge")
      .expect(200)
      .expect("hello:hoge", done);
  });

  it("POST /foo のテスト", async () => {
    const response = await request(sut.koa.callback())
      .post("/foo")
      .send({ username: "hoge", password: "hage" });
    expect(response.status).toBe(201);
    expect(response.text).toBe(
      '{"hoge":"abc","hige":1234,"hage":"元気でやってますよ"}'
    );
  });

  it("POST /foo/_by-admin のテスト", async () => {
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
    const responseObject = JSON.parse(response.text);
    expect(responseObject.title).toBe("タイトルですよねー！");
    expect(responseObject.text).toBe("まぁ、helloかもね");
    expect(responseObject.email).toBe("admin@example.com");
  });
});
