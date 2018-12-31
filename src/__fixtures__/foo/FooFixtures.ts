import { Foo } from "../../foo/Foo";

/**
 * Foo の Fixtures.
 */
export class FooFixtures {
  static create(): Foo {
    return new Foo(
      "id-12345",
      "title-123456",
      "hello world",
      6,
      "hoge@example.com",
      "www.example.com",
      new Date("2019-01-03")
    );
  }
}
