function AndroidTracingProbe(id) {
	if (id) {
		this.id = id;
	}
	debug('Initialize');
	events.EventEmitter.call(this);
}