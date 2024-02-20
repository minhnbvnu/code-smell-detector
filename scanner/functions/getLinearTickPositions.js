function getLinearTickPositions(tickInterval, min, max) {

			var pos,
				lastPos,
				roundedMin = correctFloat(mathFloor(min / tickInterval) * tickInterval),
				roundedMax = correctFloat(mathCeil(max / tickInterval) * tickInterval),
				tickPositions = [];

			// Populate the intermediate values
			pos = roundedMin;
			while (pos <= roundedMax) {

				// Place the tick on the rounded value
				tickPositions.push(pos);

				// Always add the raw tickInterval, not the corrected one.
				pos = correctFloat(pos + tickInterval);

				// If the interval is not big enough in the current min - max range to actually increase
				// the loop variable, we need to break out to prevent endless loop. Issue #619
				if (pos === lastPos) {
					break;
				}

				// Record the last value
				lastPos = pos;
			}
			return tickPositions;
		}