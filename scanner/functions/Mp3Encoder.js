function Mp3Encoder(channels, samplerate, kbps) {
	    if (arguments.length != 3) {
	        console.error('WARN: Mp3Encoder(channels, samplerate, kbps) not specified');
	        channels = 1;
	        samplerate = 44100;
	        kbps = 128;
	    }
	    var lame = new Lame();
	    var gaud = new GetAudio();
	    var ga = new GainAnalysis();
	    var bs = new BitStream();
	    var p = new Presets();
	    var qupvt = new QuantizePVT();
	    var qu = new Quantize();
	    var vbr = new VBRTag();
	    var ver = new Version();
	    var id3 = new ID3Tag();
	    var rv = new Reservoir();
	    var tak = new Takehiro();
	    var parse = new Parse();
	    var mpg = new MPGLib();

	    lame.setModules(ga, bs, p, qupvt, qu, vbr, ver, id3, mpg);
	    bs.setModules(ga, mpg, ver, vbr);
	    id3.setModules(bs, ver);
	    p.setModules(lame);
	    qu.setModules(bs, rv, qupvt, tak);
	    qupvt.setModules(tak, rv, lame.enc.psy);
	    rv.setModules(bs);
	    tak.setModules(qupvt);
	    vbr.setModules(lame, bs, ver);
	    gaud.setModules(parse, mpg);
	    parse.setModules(ver, id3, p);

	    var gfp = lame.lame_init();

	    gfp.num_channels = channels;
	    gfp.in_samplerate = samplerate;
	    gfp.brate = kbps;
	    gfp.mode = MPEGMode.STEREO;
	    gfp.quality = 3;
	    gfp.bWriteVbrTag = false;
	    gfp.disable_reservoir = true;
	    gfp.write_id3tag_automatic = false;

	    var retcode = lame.lame_init_params(gfp);
	    var maxSamples = 1152;
	    var mp3buf_size = 0 | (1.25 * maxSamples + 7200);
	    var mp3buf = new_byte(mp3buf_size);

	    this.encodeBuffer = function (left, right) {
	        if (channels == 1) {
	            right = left;
	        }
	        if (left.length > maxSamples) {
	            maxSamples = left.length;
	            mp3buf_size = 0 | (1.25 * maxSamples + 7200);
	            mp3buf = new_byte(mp3buf_size);
	        }

	        var _sz = lame.lame_encode_buffer(gfp, left, right, left.length, mp3buf, 0, mp3buf_size);
	        return new Int8Array(mp3buf.subarray(0, _sz));
	    };

	    this.flush = function () {
	        var _sz = lame.lame_encode_flush(gfp, mp3buf, 0, mp3buf_size);
	        return new Int8Array(mp3buf.subarray(0, _sz));
	    };
	}