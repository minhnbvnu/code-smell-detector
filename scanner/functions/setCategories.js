function setCategories(newCategories, doRedraw) {
				// set the categories
				axis.categories = userOptions.categories = categories = newCategories;

				// force reindexing tooltips
				each(axis.series, function (series) {
					series.translate();
					series.setTooltipPoints(true);
				});


				// optionally redraw
				axis.isDirty = true;

				if (pick(doRedraw, true)) {
					chart.redraw();
				}
		}