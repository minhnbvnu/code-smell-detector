function ChromeTracingMetrics() {
	BaseMetrics.apply(this, arguments);
	this.renderingStats = new RenderingStats();
}