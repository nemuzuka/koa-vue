# Koa + Vue.js + TypeScript

## やりたいこと

1. Koa + Vue.js の Web アプリケーションの雛形として使いたい
    * TypeScript で作れるようにしたい
    * tslint でチェックも
    * テストの書き方も
2. database のアクセスは後回し
3. master ビルド時に CircleCI 経由で docker image も作れるようにしたい

## 説明
* src/Kernel.ts
    * bind 処理を司る

## 実行方法

```
$ npm run format
$ npm start
```
