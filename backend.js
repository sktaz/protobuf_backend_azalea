// backend.js
const express = require('express')
const app = express()
const port = 3001;
const protobuf = require("protobufjs");

// exporessサーバーで、requestとしてapplication/octet-streamタイプのデータを受け取れるように定義
const bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '100kb' }))

// CORSを許可する
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})

/** 動作確認用の簡単なGETのAPI */
app.get('/hello_world', function (req, res, next) {
    res.send("hello_world!! こんにちは！！")
})


/* debug確認用に固定値をencodeしたデータを取得する **/
app.get('/dev_debug_encode_person', function (req, res, next) {
    protobuf.load("person.proto")
        .then((root) => {
            // debug確認用に固定値を使う
            const payload = { name: "Tokyo Taro", age: 200, email: "test@example.com" };

            // Obtain a message type
            const BasicPerson = root.lookupType("personpackage.BasicPerson");

            // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            const errMsg = BasicPerson.verify(payload);
            if (errMsg)
                throw Error(errMsg);

            // Uint8Array (browser) or Buffer (node)形式にデータをencode
            const encodedData = BasicPerson.encode(payload).finish();

            // debug: decoode確認用
            const decodedData = BasicPerson.decode(encodedData);
            console.log(encodedData)
            console.log(decodedData)


            res.send(encodedData)

            return encodedData

        }).catch((err) => {
            // throw err;
            console.log(err)
        })
})


/* POST Person API **/
app.post('/person', function (req, res, next) {
    console.log("====requestBodyData====")
    console.log(req.body)

    protobuf.load("person.proto")
        .then((root) => {
            // Obtain a message type
            const BasicPerson = root.lookupType("personpackage.BasicPerson");

            // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            const errMsg = BasicPerson.verify(req.body);
            if (errMsg)
                throw Error(errMsg);

            const decodedData = BasicPerson.decode(req.body);
            console.log("=====decodedData(MessageInstance)====")
            console.log(decodedData)

            // ... その他処理実行
            // 本当のアプリケーションであればDBにデータを保存するなど何か処理をするだろうが、今回はprotobufの確認なので割愛。

            // decodeメソッドを実行しただけではprotobufのMessageInstance状態なので、必要に応じてPlain objectに変換もできる
            const object = BasicPerson.toObject(decodedData, {
                longs: String,
                enums: String,
                bytes: String,
                // see ConversionOptions
            });
            console.log("====Plain Object===")
            console.log(object)

        }).catch((err) => {
            // throw err;
            console.log(err)
        })

    res.send({ "message": "成功" })
})
