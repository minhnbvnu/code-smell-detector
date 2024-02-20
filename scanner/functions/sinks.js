function sinks (type, constructor, prototype, disabled, priority) {
	prototype = prototype || constructor.prototype;
	constructor.prototype = new Sink.SinkClass();
	constructor.prototype.type = type;
	constructor.enabled = !disabled;

	var k;
	for (k in prototype) {
		if (prototype.hasOwnProperty(k)) {
			constructor.prototype[k] = prototype[k];
		}
	}

	sinks[type] = constructor;
	sinks.list[priority ? 'unshift' : 'push'](constructor);
}