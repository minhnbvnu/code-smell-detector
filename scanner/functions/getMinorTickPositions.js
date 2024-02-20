function getMinorTickPositions() {
			var minorTickPositions = [],
				pos,
				i,
				len;
			
			if (isLog) {
				len = tickPositions.length;
				for (i = 1; i < len; i++) {
					minorTickPositions = minorTickPositions.concat(
						getLogTickPositions(minorTickInterval, tickPositions[i - 1], tickPositions[i], true)
					);	
				}
			
			} else {			
				for (pos = min + (tickPositions[0] - min) % minorTickInterval; pos <= max; pos += minorTickInterval) {
					minorTickPositions.push(pos);	
				}
			}
			
			return minorTickPositions;
		}