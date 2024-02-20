function readObjectIdentifier(s, oid) {
	var size = readLength(s);
	if(size !== 5) {
		return false;
	}

	var a_oid = [0, 0, 0, 0, 0, 0];
	var t12 = new type.UInt8().read(s).value;
	a_oid[0] = t12 >> 4;
	a_oid[1] = t12 & 0x0f;
	a_oid[2] = new type.UInt8().read(s).value;
	a_oid[3] = new type.UInt8().read(s).value;
	a_oid[4] = new type.UInt8().read(s).value;
	a_oid[5] = new type.UInt8().read(s).value;

	for(var i in oid) {
		if(oid[i] !== a_oid[i]) return false;
	}

	return true;
}