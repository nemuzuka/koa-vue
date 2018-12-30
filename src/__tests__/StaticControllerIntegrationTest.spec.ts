import * as request from "supertest";
import * as sut from "../App";

/**
 * koa-static 設定の IntegrationTest.
 */
describe("koa-static の設定テスト.", () => {
  it("/ にアクセスした時 html コンテンツが帰ってくること", done => {
    request(sut.callback())
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).toContain(
          "We're sorry but client-web doesn't work properly without JavaScript enabled."
        );
        done();
      });
  });
});
