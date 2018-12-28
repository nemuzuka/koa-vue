# Koa + Vue.js + TypeScript

## やりたいこと

1. Koa + Vue.js の Web アプリケーションの雛形として使いたい
    * TypeScript で作れるようにしたい
    * tslint でチェックも
    * テストの書き方も
2. database のアクセスは後回し
3. master ビルド時に CircleCI 経由で docker image も作れるようにしたい

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

## 実行方法

```
$ npm run format
$ npm start
```

## Circle CI での docker image の build

### 必要な環境変数

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_DEFAULT_REGION`
* `ECR_ENDPOINT`: e.g. <ACCOUNT-ID>.dkr.ecr.ap-northeast-1.amazonaws.com
* `REPOSITORY_NAME`
    * `${ECR_ENDPOINT}/${REPOSITORY_NAME}` となるように設定します

### 基本ポリシー

1. develop ブランチの build 時に docker image を作成する
    * develop-ハッシュ値
2. master ブランチの build 時に docker image を作成する
    * latest
3. feature ブランチの build 時には docker image を作成しない
    * 本当は常に作成した方がいいとは思うのだけど...

## Circle CI 2.0 を local で動作する

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

