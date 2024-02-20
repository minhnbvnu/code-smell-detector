function normalizeRange(){
		rangeNormalized = {
			start: [range.start[0],range.start[1]],
			end: [range.end[0],range.end[1]]
		};
		for (var i = 0; i<2;i++){
			if (range.start[i]>range.end[i]){
				rangeNormalized.start[i] = range.end[i];
				rangeNormalized.end[i] = range.start[i];
			}
		}
	}