function writeConferenceCreateResponse (userData) {
	 var userDataStream = new type.Stream(userData.size());
	 userData.write(userDataStream);
	 
	 return new type.Component([
	    per.writeChoice(0), per.writeObjectIdentifier(t124_02_98_oid),
	    per.writeLength(userData.size() + 14), per.writeChoice(0x14),
	    per.writeInteger16(0x79F3, 1001), per.writeInteger(1), per.writeEnumerates(0),
	    per.writeNumberOfSet(1), per.writeChoice(0xc0),
	    per.writeOctetStream(new Buffer(h221_sc_key), 4), per.writeOctetStream(userDataStream.getValue())
    ]);
}