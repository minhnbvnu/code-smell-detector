function getThreshold(threshold) {
			var realMin = isLog ? lin2log(min) : min,
				realMax = isLog ? lin2log(max) : max;
			
			if (realMin > threshold || threshold === null) {
				threshold = realMin;
			} else if (realMax < threshold) {
				threshold = realMax;
			}

			return translate(threshold, 0, 1, 0, 1);
		}