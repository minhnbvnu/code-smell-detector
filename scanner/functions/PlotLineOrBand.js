function PlotLineOrBand(axis, options) {
	this.axis = axis;

	if (options) {
		this.options = options;
		this.id = options.id;
	}
}