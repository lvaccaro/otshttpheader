const OpenTimestamps = require('javascript-opentimestamps')
const request = require('request')
const moment = require('moment-timezone')

const url = "http://localhost:3000/hello-world.txt"

console.log('get ', url )

request(url, function(err, res, body){
	console.log('ots:',res.headers.ots)
	console.log('body:',body)

	const bytesBody =  OpenTimestamps.Utils.charsToBytes(body);
    const bytesOts = Buffer.from(res.headers.ots, 'base64');

    const detachedBody = OpenTimestamps.DetachedTimestampFile.fromBytes(new OpenTimestamps.Ops.OpSHA256(), bytesBody);
	const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(bytesOts)


    console.log('ots hash:', Buffer.from(detachedOts.fileDigest()).toString('hex') )
    console.log('body hash:', Buffer.from(detachedBody.fileDigest()).toString('hex') )

	if ( !OpenTimestamps.Utils.arrEq(
            detachedBody.fileDigest(), detachedOts.fileDigest())) {
		console.log("Digest doesn't match")
		return;
	} 

	console.log('Digest match')
    OpenTimestamps.verify(detachedOts, detachedBody).then( (results) => {
        if(Object.keys(results).length === 0){
        	console.log("Pending attestation");
    	}else{
        	Object.keys(results).map(chain => {
            	var date = moment(results[chain].timestamp * 1000).tz(moment.tz.guess()).format('YYYY-MM-DD z')
            	console.log('Success! ' + chain[0].toUpperCase() + chain.slice(1) + ' block ' + results[chain].height + ' attests existence as of ' + date)
    		})
    	}
	}).catch( err => {
        console.log("Bad attestation" + err);
	});

})

