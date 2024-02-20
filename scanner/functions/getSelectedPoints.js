function getSelectedPoints() {
		var points = [];
		each(series, function (serie) {
			points = points.concat(grep(serie.points, function (point) {
				return point.selected;
			}));
		});
		return points;
	}