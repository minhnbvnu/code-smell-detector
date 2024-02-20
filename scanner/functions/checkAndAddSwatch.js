function checkAndAddSwatch(c) {
		if (c instanceof p5.Color) {
  		swatches.colors.push({
  	    "name": c._array.slice(0,3).join('-'),
  	    "model": "RGB",
  	    "color": c._array.slice(0,3),
  	    "type": "global"
    	});
		} else {
		  throw new Error('Needs p5.Color array as argument.');
		}
	}