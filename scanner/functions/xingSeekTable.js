function xingSeekTable(v, t) {
	        if (v.pos <= 0)
	            return;

	        for (var i = 1; i < NUMTOCENTRIES; ++i) {
	            var j = i / NUMTOCENTRIES, act, sum;
	            var indx = 0 | (Math.floor(j * v.pos));
	            if (indx > v.pos - 1)
	                indx = v.pos - 1;
	            act = v.bag[indx];
	            sum = v.sum;
	            var seek_point = 0 | (256. * act / sum);
	            if (seek_point > 255)
	                seek_point = 255;
	            t[i] = 0xff & seek_point;
	        }
	    }