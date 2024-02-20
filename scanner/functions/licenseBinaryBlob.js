function licenseBinaryBlob(blobType) {
	blobType = blobType || BinaryBlobType.BB_ANY_BLOB;
	var self = {
		wBlobType : new type.UInt16Le(blobType, { constant : (blobType === BinaryBlobType.BB_ANY_BLOB)?false:true }),
        wBlobLen : new type.UInt16Le(function() {
        	return self.blobData.size();
        }),
        blobData : new type.BinaryString(null, { readLength : new type.CallableValue(function() {
        	return self.wBlobLen.value;
        })})
	};
	
	return new type.Component(self);
}