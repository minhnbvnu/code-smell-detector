function setAxisSize() {

			var offsetLeft = options.offsetLeft || 0,
				offsetRight = options.offsetRight || 0;

			// basic values
			axisLeft = pick(options.left, plotLeft + offsetLeft);
			axisTop = pick(options.top, plotTop);
			axisWidth = pick(options.width, plotWidth - offsetLeft + offsetRight);
			axisHeight = pick(options.height, plotHeight);
			axisBottom = chartHeight - axisHeight - axisTop;
			axisRight = chartWidth - axisWidth - axisLeft;
			axisLength = horiz ? axisWidth : axisHeight;

			// expose to use in Series object and navigator
			axis.left = axisLeft;
			axis.top = axisTop;
			axis.len = axisLength;

		}