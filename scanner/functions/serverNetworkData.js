function serverNetworkData (channelIds, opt) {
	var self = {
		__TYPE__ : MessageType.SC_NET,
		MCSChannelId : new type.UInt16Le(1003, { constant : true }),
		channelCount : new type.UInt16Le(function () {
			return self.channelIdArray.obj.length;
		}),
		channelIdArray : channelIds || new type.Factory( function (s) {
			self.channelIdArray = new type.Component([]);
			for (var i = 0; i < self.channelCount.value; i++) {
				self.channelIdArray.obj.push(new type.UInt16Le().read(s));
			}
		}),
		pad : new type.UInt16Le(null, { conditional : function () {
			return (self.channelCount.value % 2) === 1;
		}})
	};
	
	return new type.Component(self, opt);
}