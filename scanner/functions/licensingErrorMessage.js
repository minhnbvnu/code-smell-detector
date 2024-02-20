function licensingErrorMessage(opt) {
	var self = {
		__TYPE__ : MessageType.ERROR_ALERT,
		dwErrorCode : new type.UInt32Le(),
        dwStateTransition : new type.UInt32Le(),
        blob : licenseBinaryBlob(BinaryBlobType.BB_ANY_BLOB)
	};
	
	return new type.Component(self, opt);
}