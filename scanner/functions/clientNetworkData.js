function clientNetworkData(channelDefArray, opt) {
	var self = {
		__TYPE__ : MessageType.CS_NET,
		channelCount : new type.UInt32Le( function () {
			return self.channelDefArray.obj.length;
		}),
		channelDefArray : channelDefArray || new type.Factory( function (s) {
			self.channelDefArray = new type.Component([]);
			
			for (var i = 0; i < self.channelCount.value; i++) {
				self.channelDefArray.obj.push(channelDef().read(s));
			}
		})
	};
	
	return new type.Component(self, opt);
}