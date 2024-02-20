function doDissolvePixel() {
		var rand = Math.floor((Math.random() * 100) + 1);
		return (rand <= parseFloat($('#iDissolvePc').val()));
	}