function mockMqtt() {
	// Record list indicating whether the corresponding method is called
	this.commandCalled = {'emit':0};

	// Reinit the record list
	this.reInitCommandCalled = function() {
		this.commandCalled['emit'] = 0;
	};
    this.emit = function(errorString, error) {
		this.commandCalled['emit'] += 1;
                this.error = error;
    };
    EventEmitter.call(this);
}