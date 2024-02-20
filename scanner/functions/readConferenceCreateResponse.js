function readConferenceCreateResponse(s) {
	per.readChoice(s);
	
	if(!per.readObjectIdentifier(s, t124_02_98_oid)) {
		throw new error.ProtocolError('NODE_RDP_PROTOCOL_T125_GCC_BAD_OBJECT_IDENTIFIER_T124');
	}
	
	per.readLength(s);
	per.readChoice(s);
	per.readInteger16(s, 1001);
	per.readInteger(s);
	per.readEnumerates(s);
	per.readNumberOfSet(s);
	per.readChoice(s);
	
	if (!per.readOctetStream(s, h221_sc_key, 4)) {
		throw new error.ProtocolError('NODE_RDP_PROTOCOL_T125_GCC_BAD_H221_SC_KEY');
	}
	
	length = per.readLength(s);
	serverSettings = settings(null, { readLength : new type.CallableValue(length) });
	
	// Object magic
	return serverSettings.read(s).obj.blocks.obj.map(function(e) {
		return e.obj.data;
	});
}