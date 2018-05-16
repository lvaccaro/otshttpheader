const express = require('express')
const fs = require('fs')
const app = express()

const public_dir = "examples"
const proofs_dir = "examples-proofs"

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var path = proofs_dir+req.path+".ots";
    fs.readFile(path, (err, data) => {
        res.setHeader('ots',Buffer.from(data).toString('base64'))
        return next();
    })
});
app.use(express.static(public_dir));
app.listen(3000, () => console.log('Example app listening on port 3000!'))


function bytesToHex (bytes) {
  const hex = []
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xF).toString(16))
  }
  return hex.join('')
}

function bytesToChars (buffer) {
  let charts = ''
  for (let b = 0; b < buffer.length; b++) {
    charts += String.fromCharCode(b)[0]
  }
  return charts
}

