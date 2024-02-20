function clientInputEventPDU(inputs, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_INPUT,
		numEvents : new type.UInt16Le(function() {
			return self.slowPathInputEvents.obj.length;
		}),
        pad2Octets : new type.UInt16Le(),
        slowPathInputEvents : inputs || new type.Factory(function(s) {
        	self.slowPathInputEvents = new type.Component([]);
        	for(var i = 0; i < self.numEvents.value; i++) {
        		self.slowPathInputEvents.obj.push(slowPathInputEvent().read(s));
        	}
        })  
	};
	
	return new type.Component(self, opt);
}