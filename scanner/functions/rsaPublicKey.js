function rsaPublicKey(opt) {
	var self = {
		magic : new type.UInt32Le(0x31415352, { constant : true }),
        keylen : new type.UInt32Le(function() {
        	return self.modulus.size() + self.paddinf.size();
        }),
        bitlen : new type.UInt32Le(function() {
        	return (self.keylen.value - 8) * 8;
        }),
        datalen : new type.UInt32Le(function() {
        	return (self.bitlen.value / 8) - 1;
        }),
        pubExp : new type.UInt32Le(),
        modulus : new type.BinaryString(null, { readLength : new type.CallableValue(function() {
        	return self.keylen.value - 8;
        }) }),
        padding : new type.BinaryString(new Buffer(Array(8 + 1).join('\x00')), { readLength : new type.CallableValue(8) })
	};
	
	return new type.Component(self, opt);
}