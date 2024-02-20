function pointerCapability(isServer, opt) {
	var self = {
		__TYPE__ : CapsType.CAPSTYPE_POINTER,
		colorPointerFlag : new type.UInt16Le(),
        colorPointerCacheSize : new type.UInt16Le(20),
        //old version of rdp doesn't support ...
        pointerCacheSize : new type.UInt16Le(null, {conditional : function() {
        	return isServer || false;
        }})
    };
	
	return new type.Component(self, opt);
}