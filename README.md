# protobuf_backend_azalea

Client/Backendの両方でJavascriptを利用してProtobuf(Protocol Buffers)を使ってみて学習することが趣旨です。

このレポジトリはBackend側に該当します。

□ Client側: React.jsで作成した簡易的なWebアプリ。  
Clientのコード: https://github.com/sktaz/protobuf_client_azalea

□ Backend側: node.js(express利用)で作成した簡易的なAPIサーバー。


## 使い方
□ APIサーバーの始動
```
yarn install
```

```
node backend.js
```

□  http://localhost:3001/person に対してPOSTのリクエストが可能です。

□ デバッグ用に  http://localhost:3001/dev_debug_encode_person に対してGETのリクエストを送り、
encodeとdecodeの挙動をterminalのログから確認できます。


## 使ったライブラリ
protobufを使ったエンコードとデコードには https://github.com/protobufjs/protobuf.js を利用しました。
