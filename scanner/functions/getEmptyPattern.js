function getEmptyPattern(){
		var result = [];
		for (var step = 0; step<patternLength; step++){
			var row = [];
			var channel;
			for (channel = 0; channel < trackCount; channel++){
				row.push(Note());
			}
			result.push(row);
		}
		return result;
	}