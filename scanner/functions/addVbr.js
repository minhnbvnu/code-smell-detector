function addVbr(v, bitrate) {
	        v.nVbrNumFrames++;
	        v.sum += bitrate;
	        v.seen++;

	        if (v.seen < v.want) {
	            return;
	        }

	        if (v.pos < v.size) {
	            v.bag[v.pos] = v.sum;
	            v.pos++;
	            v.seen = 0;
	        }
	        if (v.pos == v.size) {
	            for (var i = 1; i < v.size; i += 2) {
	                v.bag[i / 2] = v.bag[i];
	            }
	            v.want *= 2;
	            v.pos /= 2;
	        }
	    }