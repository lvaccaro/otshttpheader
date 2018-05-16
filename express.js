const express = require('express')
const fs = require('fs')
const app = express()

const public_dir = "examples"
const proofs_dir = "examples-proofs"

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var path = proofs_dir + req.path + ".ots";
    fs.readFile(path, (err, data) => {
        if (data) {
            res.setHeader('ots', Buffer.from(data).toString('base64'))
        }
        return next();
    })
});
app.use(express.static(public_dir));
app.use(function(req, res) {
    res.status(404).send("");
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))
