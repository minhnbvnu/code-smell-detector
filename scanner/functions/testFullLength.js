function testFullLength() {
	    var r = fs.readFileSync("testdata/IMG_0373.wav");
	    var sampleBuf = new Uint8Array(r).buffer;
	    var w = WavHeader.readHeader(new DataView(sampleBuf));
	    var samples = new Int16Array(sampleBuf, w.dataOffset, w.dataLen / 2);
	    var remaining = samples.length;
	    var lameEnc = new Mp3Encoder(); //w.channels, w.sampleRate, 128);
	    var maxSamples = 1152;

	    var fd = fs.openSync("testjs2.mp3", "w");
	    var time = new Date().getTime();
	    for (var i = 0; remaining >= maxSamples; i += maxSamples) {
	        var left = samples.subarray(i, i + maxSamples);
	        var right = samples.subarray(i, i + maxSamples);

	        var mp3buf = lameEnc.encodeBuffer(left, right);
	        if (mp3buf.length > 0) {
	            fs.writeSync(fd, new Buffer(mp3buf), 0, mp3buf.length);
	        }
	        remaining -= maxSamples;
	    }
	    var mp3buf = lameEnc.flush();
	    if (mp3buf.length > 0) {
	        fs.writeSync(fd, new Buffer(mp3buf), 0, mp3buf.length);
	    }
	    fs.closeSync(fd);
	    time = new Date().getTime() - time;
	    console.log('done in ' + time + 'msec');
	}