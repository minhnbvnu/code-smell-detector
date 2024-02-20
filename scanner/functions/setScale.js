function setScale() {
			var type,
				i,
				isDirtyData,
				isDirtyAxisLength;
				
			oldMin = min;
			oldMax = max;
			oldAxisLength = axisLength;

			// set the new axisLength
			axisLength = horiz ? axisWidth : axisHeight;
			isDirtyAxisLength = axisLength !== oldAxisLength;

			// is there new data?
			each(axis.series, function (series) {
				if (series.isDirtyData || series.isDirty ||
						series.xAxis.isDirty) { // when x axis is dirty, we need new data extremes for y as well
					isDirtyData = true;
				}
			});

			// do we really need to go through all this?
			if (isDirtyAxisLength || isDirtyData || isLinked ||
				userMin !== oldUserMin || userMax !== oldUserMax) {

				// get data extremes if needed
				getSeriesExtremes();

				// get fixed positions based on tickInterval
				setTickPositions();

				// record old values to decide whether a rescale is necessary later on (#540)
				oldUserMin = userMin;
				oldUserMax = userMax;

				// reset stacks
				if (!isXAxis) {
					for (type in stacks) {
						for (i in stacks[type]) {
							stacks[type][i].cum = stacks[type][i].total;
						}
					}
				}

				// Mark as dirty if it is not already set to dirty and extremes have changed. #595.
				if (!axis.isDirty) {
					axis.isDirty = isDirtyAxisLength || min !== oldMin || max !== oldMax;
				}
			}
		}