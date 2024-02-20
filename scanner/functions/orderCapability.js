function orderCapability(orders, opt) {
	if(orders && orders.size() !== 32) {
		throw new error.FatalError('NODE_RDP_PROTOCOL_PDU_CAPS_BAD_ORDERS_SIZE');
	}
	
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_ORDER,
		terminalDescriptor : new type.BinaryString(new Buffer(Array(16 + 1).join('\x00'), 'binary'), {readLength : new type.CallableValue(16)}),
        pad4octetsA : new type.UInt32Le(0),
        desktopSaveXGranularity : new type.UInt16Le(1),
        desktopSaveYGranularity : new type.UInt16Le(20),
        pad2octetsA : new type.UInt16Le(0),
        maximumOrderLevel : new type.UInt16Le(1),
        numberFonts : new type.UInt16Le(),
        orderFlags : new type.UInt16Le(OrderFlag.NEGOTIATEORDERSUPPORT),
        orderSupport : orders || new type.Factory(function(s) {
        	self.orderSupport = new type.BinaryString(null, {readLength : new type.CallableValue(32)}).read(s);
        }),
        textFlags : new type.UInt16Le(),
        orderSupportExFlags : new type.UInt16Le(),
        pad4octetsB : new type.UInt32Le(),
        desktopSaveSize : new type.UInt32Le(480 * 480),
        pad2octetsC : new type.UInt16Le(),
        pad2octetsD : new type.UInt16Le(),
        textANSICodePage : new type.UInt16Le(0),
        pad2octetsE : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}