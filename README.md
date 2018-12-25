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
