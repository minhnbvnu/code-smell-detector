function productInformation() {
	var self = {
		dwVersion : new type.UInt32Le(),
        cbCompanyName : new type.UInt32Le(function() {
        	return self.pbCompanyName.size();
        }),
        // may contain "Microsoft Corporation" from server microsoft
        pbCompanyName : new type.BinaryString(new Buffer('Microsoft Corporation', 'ucs2'), { readLength : new type.CallableValue(function() {
        	return self.cbCompanyName.value;
        })}),
        cbProductId : new type.UInt32Le(function() {
        	return self.pbProductId.size();
        }),
        // may contain "A02" from microsoft license server
        pbProductId : new type.BinaryString(new Buffer('A02', 'ucs2'), { readLength : new type.CallableValue(function() {
        	return self.cbProductId.value;
        })})
	};
	
	return new type.Component(self);
}