function getMostUsed(indents) {
		var result = 0;
		var maxUsed = 0;
		var maxWeight = 0;

		for (var n in indents) {
			var indent = indents[n];
			var u = indent[0];
			var w = indent[1];

			if (u > maxUsed || u === maxUsed && w > maxWeight) {
				maxUsed = u;
				maxWeight = w;
				result = Number(n);
			}
		}

		return result;
	}