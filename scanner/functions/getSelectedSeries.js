function getSelectedSeries() {
		return grep(series, function (serie) {
			return serie.selected;
		});
	}