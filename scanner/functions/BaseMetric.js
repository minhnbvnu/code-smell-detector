function BaseMetric(cfg) {
	cfg = cfg || {};
	this.probes = cfg.probes || this.probes;
	if (!this.probes || !Array.isArray(this.probes)) {
		this.probes = [];
	}
	this.hrtime = process.hrtime();
	this.__data = [];
}