function scopeList() {
	var self = {
		scopeCount : new type.UInt32Le(function() {
			return self.scopeArray.length;
		}),
		scopeArray : new type.Factory(function(s) {
			self.scopeArray = new type.Component([]);
			for(var i = 0; i < self.scopeCount.value; i++) {
				self.scopeArray.obj.push(scope().read(s));
			}
		})
	};
	
	return new type.Component(self);
}