function anyRx(rxs, str) {
		var i,
		    len;
		for (i = 0, len = rxs.length; i < len; i++) {
			if (rxs[i].test(str)) {
				return true;
			}
		}
		return false;
	}