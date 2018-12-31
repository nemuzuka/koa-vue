# Koa + Vue.js + TypeScript

[![CircleCI](https://circleci.com/gh/nemuzuka/koa-vue.svg?style=svg)](https://circleci.com/gh/nemuzuka/koa-vue)

## やりたいこと

1. Koa + Vue.js の Web アプリケーションの雛形として使いたい
    * TypeScript で作れるようにしたい
    * tslint でチェックも
    * テストの書き方も
2. database のアクセスは後回し
3. master / develop ビルド時に CircleCI 経由で docker image も作れるようにしたい

## 説明
* src 配下
    * サーバサイド処理
    * src/Kernel.ts
        * bind 処理を司る
* client-web 配下
    * フロント処理
    * Vue.js で記載する想定
    * `npm run build` で `../vue-public` に出力する
* vue-public
    * フロントの build 結果をここに出力する
    * koa-static での参照先が本ディレクトリとなる

## Test

`src/__tests__` 配下に格納。

`src/__fixtures__` 配下にはテスト用の Fixture を格納(テスト対象外)

### Unit Test

* [FooTest.spec.ts](src/__tests__/foo/FooTest.spec.ts)
    * `class-validator` を使用したケースのテスト
* [FooControllerTest.spec.ts](src/__tests__/foo/FooControllerTest.spec.ts)
    * Service を Mock に差し替え API を呼び出して結果を確認する

### Integration Test

Koa 経由で実行するパターン

* [FooControllerIntegration.spec.ts](src/__tests__/foo/FooControllerIntegration.spec.ts)
    * 実際に API を呼び出して結果を確認する
* [StaticControllerIntegrationTest.spec.ts](src/__tests__/StaticControllerIntegrationTest.spec.ts)
    * `/` アクセス時の確認(`koa-static` が設定されているかの確認)

## 実行方法

```
$ npm run format
$ npm start
```

## CircleCI での docker image の build

### 必要な環境変数

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_DEFAULT_REGION`
* `ECR_ENDPOINT`: e.g. `<ACCOUNT-ID>.dkr.ecr.ap-northeast-1.amazonaws.com`
* `REPOSITORY_NAME`
    * `${ECR_ENDPOINT}/${REPOSITORY_NAME}` となるように設定します

### 基本ポリシー

1. develop ブランチの build 時に docker image を作成する
    * development-${CIRCLE_BUILD_NUM}
2. master ブランチの build 時に docker image を作成する
    * master-${CIRCLE_BUILD_NUM}
3. feature ブランチの build 時には docker image を作成しない
    * 本当は常に作成した方がいいとは思うのだけど...

## CircleCI 2.0 を local で動作する

### 初回だけ実行

```sh
$ curl -o /usr/local/bin/circleci https://circle-downloads.s3.amazonaws.com/releases/build_agent_wrapper/circleci && chmod +x /usr/local/bin/circleci
$ circleci update
```

### 都度実行

#### 設定した config.yml が正しいか確認する

```
$ circleci config validate -c .circleci/config.yml
```

`config file is valid` と出れば OK


#### local で動かす

```
$ circleci build .circleci/config.yml
```

