function getSeriesExtremes() {
			var posStack = [],
				negStack = [],
				i;

			// reset dataMin and dataMax in case we're redrawing
			dataMin = dataMax = null;

			// loop through this axis' series
			each(axis.series, function (series) {

				if (series.visible || !optionsChart.ignoreHiddenSeries) {

					var seriesOptions = series.options,
						stacking,
						posPointStack,
						negPointStack,
						stackKey,
						stackOption,
						negKey,
						xData,
						yData,
						x,
						y,
						threshold = seriesOptions.threshold,
						yDataLength,
						activeYData = [],
						activeCounter = 0;
						
					// Validate threshold in logarithmic axes
					if (isLog && threshold <= 0) {
						threshold = seriesOptions.threshold = null;
					}

					// Get dataMin and dataMax for X axes
					if (isXAxis) {
						xData = series.xData;
						if (xData.length) {
							dataMin = mathMin(pick(dataMin, xData[0]), arrayMin(xData));
							dataMax = mathMax(pick(dataMax, xData[0]), arrayMax(xData));
						}

					// Get dataMin and dataMax for Y axes, as well as handle stacking and processed data
					} else {
						var isNegative,
							pointStack,
							key,
							cropped = series.cropped,
							xExtremes = series.xAxis.getExtremes(),
							//findPointRange,
							//pointRange,
							j,
							hasModifyValue = !!series.modifyValue;


						// Handle stacking
						stacking = seriesOptions.stacking;
						usePercentage = stacking === 'percent';

						// create a stack for this particular series type
						if (stacking) {
							stackOption = seriesOptions.stack;
							stackKey = series.type + pick(stackOption, '');
							negKey = '-' + stackKey;
							series.stackKey = stackKey; // used in translate

							posPointStack = posStack[stackKey] || []; // contains the total values for each x
							posStack[stackKey] = posPointStack;

							negPointStack = negStack[negKey] || [];
							negStack[negKey] = negPointStack;
						}
						if (usePercentage) {
							dataMin = 0;
							dataMax = 99;
						}


						// processData can alter series.pointRange, so this goes after
						//findPointRange = series.pointRange === null;

						xData = series.processedXData;
						yData = series.processedYData;
						yDataLength = yData.length;

						// loop over the non-null y values and read them into a local array
						for (i = 0; i < yDataLength; i++) {
							x = xData[i];
							y = yData[i];
							if (y !== null && y !== UNDEFINED) {

								// read stacked values into a stack based on the x value,
								// the sign of y and the stack key
								if (stacking) {
									isNegative = y < threshold;
									pointStack = isNegative ? negPointStack : posPointStack;
									key = isNegative ? negKey : stackKey;

									y = pointStack[x] =
										defined(pointStack[x]) ?
										pointStack[x] + y : y;


									// add the series
									if (!stacks[key]) {
										stacks[key] = {};
									}

									// If the StackItem is there, just update the values,
									// if not, create one first
									if (!stacks[key][x]) {
										stacks[key][x] = new StackItem(options.stackLabels, isNegative, x, stackOption);
									}
									stacks[key][x].setTotal(y);


								// general hook, used for Highstock compare values feature
								} else if (hasModifyValue) {
									y = series.modifyValue(y);
								}

								// get the smallest distance between points
								/*if (i) {
									distance = mathAbs(xData[i] - xData[i - 1]);
									pointRange = pointRange === UNDEFINED ? distance : mathMin(distance, pointRange);
								}*/

								// for points within the visible range, including the first point outside the
								// visible range, consider y extremes
								if (cropped || ((xData[i + 1] || x) >= xExtremes.min && (xData[i - 1] || x) <= xExtremes.max)) {

									j = y.length;
									if (j) { // array, like ohlc data
										while (j--) {
											if (y[j] !== null) {
												activeYData[activeCounter++] = y[j];
											}
										}
									} else {
										activeYData[activeCounter++] = y;
									}
								}
							}
						}

						// record the least unit distance
						/*if (findPointRange) {
							series.pointRange = pointRange || 1;
						}
						series.closestPointRange = pointRange;*/

						// Get the dataMin and dataMax so far. If percentage is used, the min and max are
						// always 0 and 100. If the length of activeYData is 0, continue with null values.
						if (!usePercentage && activeYData.length) {
							dataMin = mathMin(pick(dataMin, activeYData[0]), arrayMin(activeYData));
							dataMax = mathMax(pick(dataMax, activeYData[0]), arrayMax(activeYData));
						}

						// Adjust to threshold
						if (defined(threshold)) {
							if (dataMin >= threshold) {
								dataMin = threshold;
								ignoreMinPadding = true;
							} else if (dataMax < threshold) {
								dataMax = threshold;
								ignoreMaxPadding = true;
							}
						}
					}
				}
			});

		}