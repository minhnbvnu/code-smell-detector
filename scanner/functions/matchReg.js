function matchReg(regExp) {
	      var subStr = str.substring(pos);
	      var res = subStr.match(regExp);
	      if (res) {
	        res.range = [];
	        res.range[0] = pos;
	        incr(res[0].length);
	        res.range[1] = pos;
	      }
	      return res;
	    }