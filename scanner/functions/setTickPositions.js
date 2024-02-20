function setTickPositions(secondPass) {

			var length,
				linkedParentExtremes,
				tickIntervalOption = options.tickInterval,
				tickPixelIntervalOption = options.tickPixelInterval;

			// linked axis gets the extremes from the parent axis
			if (isLinked) {
				linkedParent = chart[isXAxis ? 'xAxis' : 'yAxis'][options.linkedTo];
				linkedParentExtremes = linkedParent.getExtremes();
				min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);
				max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);
				if (options.type !== linkedParent.options.type) {
					error(11, 1); // Can't link axes of different type
				}
			} else { // initial min and max from the extreme data values
				min = pick(userMin, options.min, dataMin);
				max = pick(userMax, options.max, dataMax);
			}

			if (isLog) {
				if (!secondPass && mathMin(min, dataMin) <= 0) {
					error(10, 1); // Can't plot negative values on log axis
				}
				min = log2lin(min);
				max = log2lin(max);
			}

			// handle zoomed range
			if (range) {
				userMin = min = mathMax(min, max - range); // #618
				userMax = max;
				if (secondPass) {
					range = null;  // don't use it when running setExtremes
				}
			}

			// adjust min and max for the minimum range
			adjustForMinRange();

			// pad the values to get clear of the chart's edges
			if (!categories && !usePercentage && !isLinked && defined(min) && defined(max)) {
				length = (max - min) || 1;
				if (!defined(options.min) && !defined(userMin) && minPadding && (dataMin < 0 || !ignoreMinPadding)) {
					min -= length * minPadding;
				}
				if (!defined(options.max) && !defined(userMax)  && maxPadding && (dataMax > 0 || !ignoreMaxPadding)) {
					max += length * maxPadding;
				}
			}

			// get tickInterval
			if (min === max || min === undefined || max === undefined) {
				tickInterval = 1;
			} else if (isLinked && !tickIntervalOption &&
					tickPixelIntervalOption === linkedParent.options.tickPixelInterval) {
				tickInterval = linkedParent.tickInterval;
			} else {
				tickInterval = pick(
					tickIntervalOption,
					categories ? // for categoried axis, 1 is default, for linear axis use tickPix
						1 :
						(max - min) * tickPixelIntervalOption / (axisLength || 1)
				);
			}

			// Now we're finished detecting min and max, crop and group series data. This
			// is in turn needed in order to find tick positions in ordinal axes. 
			if (isXAxis && !secondPass) {
				each(axis.series, function (series) {
					series.processData(min !== oldMin || max !== oldMax);             
				});
			}

			// set the translation factor used in translate function
			setAxisTranslation();

			// hook for ordinal axes. To do: merge with below
			if (axis.beforeSetTickPositions) {
				axis.beforeSetTickPositions();
			}
			
			// hook for extensions, used in Highstock ordinal axes
			if (axis.postProcessTickInterval) {
				tickInterval = axis.postProcessTickInterval(tickInterval);				
			}

			// for linear axes, get magnitude and normalize the interval
			if (!isDatetimeAxis && !isLog) { // linear
				magnitude = math.pow(10, mathFloor(math.log(tickInterval) / math.LN10));
				if (!defined(options.tickInterval)) {
					tickInterval = normalizeTickInterval(tickInterval, null, magnitude, options);
				}
			}

			// record the tick interval for linked axis
			axis.tickInterval = tickInterval;

			// get minorTickInterval
			minorTickInterval = options.minorTickInterval === 'auto' && tickInterval ?
					tickInterval / 5 : options.minorTickInterval;

			// find the tick positions
			tickPositions = options.tickPositions || (tickPositioner && tickPositioner.apply(axis, [min, max]));
			if (!tickPositions) {
				if (isDatetimeAxis) {
					tickPositions = (axis.getNonLinearTimeTicks || getTimeTicks)(
						normalizeTimeTickInterval(tickInterval, options.units),
						min,
						max,
						options.startOfWeek,
						axis.ordinalPositions,
						axis.closestPointRange,
						true
					);
				} else if (isLog) {
					tickPositions = getLogTickPositions(tickInterval, min, max);
				} else {
					tickPositions = getLinearTickPositions(tickInterval, min, max);
				}
			}

			if (!isLinked) {

				// reset min/max or remove extremes based on start/end on tick
				var roundedMin = tickPositions[0],
					roundedMax = tickPositions[tickPositions.length - 1];

				if (options.startOnTick) {
					min = roundedMin;
				} else if (min > roundedMin) {
					tickPositions.shift();
				}

				if (options.endOnTick) {
					max = roundedMax;
				} else if (max < roundedMax) {
					tickPositions.pop();
				}

				// record the greatest number of ticks for multi axis
				if (!maxTicks) { // first call, or maxTicks have been reset after a zoom operation
					maxTicks = {
						x: 0,
						y: 0
					};
				}

				if (!isDatetimeAxis && tickPositions.length > maxTicks[xOrY] && options.alignTicks !== false) {
					maxTicks[xOrY] = tickPositions.length;
				}
			}
		}