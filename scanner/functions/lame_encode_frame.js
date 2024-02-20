function lame_encode_frame(gfp, inbuf_l, inbuf_r, mp3buf, mp3bufPos, mp3buf_size) {
	        var ret = self.enc.lame_encode_mp3_frame(gfp, inbuf_l, inbuf_r, mp3buf,
	            mp3bufPos, mp3buf_size);
	        gfp.frameNum++;
	        return ret;
	    }