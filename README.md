# otshttpheader
Include OpenTimestamps proofs into `ots` http response header tag.

### Run server
Server read static files, from `examples`, directory and 
add ots proof, from `examples-proof`, in the response header in base64 format.
Start a web server on port 3000.
```
node express.js
```
Check the headers response fields
```
curl -i http://localhost:3000/hello-world.txt
```

### Run client
Download the example page `hello-world.txt`, build & match the sha256 digest and verify ots proof with [javascript-opentimestamp library](https://github.com/opentimestamps/javascript-opentimestamps).
```
node client
Success! Bitcoin block 358391 attests existence as of 2015-05-28 CEST
```

### Check manually
```
curl http://localhost:3000/hello-world.txt  > hello-world.txt
curl -i http://localhost:3000/hello-world.txt | grep ots | tail -c+6 | base64 --decode > hello-world.txt.ots
ots verify hello-world.txt.ots
Success! Bitcoin block 358391 attests existence as of 2015-05-28 CEST
```
