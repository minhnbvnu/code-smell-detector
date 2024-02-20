function readConferenceCreateRequest (s) {
	per.readChoice(s);
	if (!per.readObjectIdentifier(s, t124_02_98_oid)) {
		throw new error.ProtocolError('NODE_RDP_PROTOCOL_T125_GCC_BAD_H221_SC_KEY');
	}
	per.readLength(s);
	per.readChoice(s);
	per.readSelection(s);
	per.readNumericString(s, 1);
	per.readPadding(s, 1);

	if (per.readNumberOfSet(s) !== 1) {
		throw new error.ProtocolError('NODE_RDP_PROTOCOL_T125_GCC_BAD_SET');
	}

	if (per.readChoice(s) !== 0xc0) {
		throw new error.ProtocolError('NODE_RDP_PROTOCOL_T125_GCC_BAD_CHOICE');
	}

	per.readOctetStream(s, h221_cs_key, 4);
	
	length = per.readLength(s);
	var clientSettings = settings(null, { readLength : new type.CallableValue(length) });
	
	// Object magic
	return clientSettings.read(s).obj.blocks.obj.map(function(e) {
		return e.obj.data;
	});
}