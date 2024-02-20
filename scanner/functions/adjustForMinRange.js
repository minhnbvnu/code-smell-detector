function adjustForMinRange() {
			var zoomOffset,
				spaceAvailable = dataMax - dataMin >= minRange,
				closestDataRange,
				i,
				distance,
				xData,
				loopLength,
				minArgs,
				maxArgs;
				
			// Set the automatic minimum range based on the closest point distance
			if (isXAxis && minRange === UNDEFINED && !isLog) {
				
				if (defined(options.min) || defined(options.max)) {
					minRange = null; // don't do this again

				} else {

					// Find the closest distance between raw data points, as opposed to
					// closestPointRange that applies to processed points (cropped and grouped)
					each(axis.series, function (series) {
						xData = series.xData;
						loopLength = series.xIncrement ? 1 : xData.length - 1;
						for (i = loopLength; i > 0; i--) {
							distance = xData[i] - xData[i - 1];
							if (closestDataRange === UNDEFINED || distance < closestDataRange) {
								closestDataRange = distance;
							}
						}
					});
					minRange = mathMin(closestDataRange * 5, dataMax - dataMin);
				}
			}
			
			// if minRange is exceeded, adjust
			if (max - min < minRange) {

				zoomOffset = (minRange - max + min) / 2;

				// if min and max options have been set, don't go beyond it
				minArgs = [min - zoomOffset, pick(options.min, min - zoomOffset)];
				if (spaceAvailable) { // if space is available, stay within the data range
					minArgs[2] = dataMin;
				}
				min = arrayMax(minArgs);

				maxArgs = [min + minRange, pick(options.max, min + minRange)];
				if (spaceAvailable) { // if space is availabe, stay within the data range
					maxArgs[2] = dataMax;
				}
				
				max = arrayMin(maxArgs);

				// now if the max is adjusted, adjust the min back
				if (max - min < minRange) {
					minArgs[0] = max - minRange;
					minArgs[1] = pick(options.min, max - minRange);
					min = arrayMax(minArgs);
				}
			}
		}