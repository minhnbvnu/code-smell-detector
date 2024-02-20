function splitRange(useEmptyRange){
		var result = {};
		if (rangeLength){
			result.tail = currentSampleData.slice(rangeStart + rangeLength);
			result.range = currentSampleData.slice(rangeStart,rangeStart + rangeLength);
			result.head = currentSampleData.slice(0,rangeStart);
		}else{
			if (useEmptyRange){
				result.range = [];
				result.tail = currentSampleData.slice(rangeStart);
				result.head = currentSampleData.slice(0,rangeStart);
			}else{
				result.tail = [];
				result.range = currentSampleData.slice(0,currentSampleData.length);
				result.head = [];
			}

		}

		return result;
	}