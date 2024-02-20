function testStereo44100() {
	    var r1 = fs.readFileSync("testdata/Left44100.wav");
	    var r2 = fs.readFileSync("testdata/Right44100.wav");
	    var fd = fs.openSync("stereo.mp3", "w");

	    var sampleBuf1 = new Uint8Array(r1).buffer;
	    var sampleBuf2 = new Uint8Array(r2).buffer;
	    var w1 = WavHeader.readHeader(new DataView(sampleBuf1));
	    var w2 = WavHeader.readHeader(new DataView(sampleBuf2));

	    var samples1 = new Int16Array(sampleBuf1, w1.dataOffset, w1.dataLen / 2);
	    var samples2 = new Int16Array(sampleBuf2, w2.dataOffset, w2.dataLen / 2);
	    var remaining1 = samples1.length;
	    var remaining2 = samples2.length;

	    var lameEnc = new Mp3Encoder(2, w1.sampleRate, 128);
	    var maxSamples = 1152;

	    var time = new Date().getTime();
	    for (var i = 0; remaining1 >= maxSamples; i += maxSamples) {
	        var left = samples1.subarray(i, i + maxSamples);
	        var right = samples2.subarray(i, i + maxSamples);

	        var mp3buf = lameEnc.encodeBuffer(left, right);
	        if (mp3buf.length > 0) {
	            fs.writeSync(fd, new Buffer(mp3buf), 0, mp3buf.length);
	        }
	        remaining1 -= maxSamples;

	    }
	    var mp3buf = lameEnc.flush();
	    if (mp3buf.length > 0) {
	        fs.writeSync(fd, new Buffer(mp3buf), 0, mp3buf.length);
	    }
	    fs.closeSync(fd);
	    time = new Date().getTime() - time;
	    console.log('done in ' + time + 'msec');
	}