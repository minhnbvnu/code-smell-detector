function getLogTickPositions(interval, min, max, minor) {
			
			// Since we use this method for both major and minor ticks,
			// use a local variable and return the result
			var positions = []; 
			
			// Reset
			if (!minor) {
				axis._minorAutoInterval = null;
			}
			
			// First case: All ticks fall on whole logarithms: 1, 10, 100 etc.
			if (interval >= 0.5) {
				interval = mathRound(interval);
				positions = getLinearTickPositions(interval, min, max);
				
			// Second case: We need intermediary ticks. For example 
			// 1, 2, 4, 6, 8, 10, 20, 40 etc. 
			} else if (interval >= 0.08) {
				var roundedMin = mathFloor(min),
					intermediate,
					i,
					j,
					len,
					pos,
					lastPos,
					break2;
					
				if (interval > 0.3) {
					intermediate = [1, 2, 4];
				} else if (interval > 0.15) { // 0.2 equals five minor ticks per 1, 10, 100 etc
					intermediate = [1, 2, 4, 6, 8];
				} else { // 0.1 equals ten minor ticks per 1, 10, 100 etc
					intermediate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				}
				
				for (i = roundedMin; i < max + 1 && !break2; i++) {
					len = intermediate.length;
					for (j = 0; j < len && !break2; j++) {
						pos = log2lin(lin2log(i) * intermediate[j]);
						
						if (pos > min) {
							positions.push(lastPos);
						}
						
						if (lastPos > max) {
							break2 = true;
						}
						lastPos = pos;
					}
				}
				
			// Third case: We are so deep in between whole logarithmic values that
			// we might as well handle the tick positions like a linear axis. For
			// example 1.01, 1.02, 1.03, 1.04.
			} else {
				var realMin = lin2log(min),
					realMax = lin2log(max),
					tickIntervalOption = options[minor ? 'minorTickInterval' : 'tickInterval'],
					filteredTickIntervalOption = tickIntervalOption === 'auto' ? null : tickIntervalOption,
					tickPixelIntervalOption = options.tickPixelInterval / (minor ? 5 : 1),
					totalPixelLength = minor ? axisLength / tickPositions.length : axisLength;
				
				interval = pick(
					filteredTickIntervalOption,
					axis._minorAutoInterval,
					(realMax - realMin) * tickPixelIntervalOption / (totalPixelLength || 1)
				);
				
				interval = normalizeTickInterval(
					interval, 
					null, 
					math.pow(10, mathFloor(math.log(interval) / math.LN10))
				);
				
				positions = map(getLinearTickPositions(
					interval, 
					realMin,
					realMax	
				), log2lin);
				
				if (!minor) {
					axis._minorAutoInterval = interval / 5;
				}
			}
			
			// Set the axis-level tickInterval variable 
			if (!minor) {
				tickInterval = interval;
			}
			return positions;
		}