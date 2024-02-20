function setInvert() {			
			var size = {
				width: series.yAxis.len,
				height: series.xAxis.len
			};
			
			each(['group', 'markerGroup'], function (groupName) {
				if (series[groupName]) {
					series[groupName].attr(size).invert();
				}
			});
		}