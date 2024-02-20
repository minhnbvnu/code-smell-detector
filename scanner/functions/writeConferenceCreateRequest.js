function writeConferenceCreateRequest (userData) {
    var userDataStream = new type.Stream(userData.size());
    userData.write(userDataStream);
    
    return new type.Component([
	    per.writeChoice(0), per.writeObjectIdentifier(t124_02_98_oid),
	    per.writeLength(userData.size() + 14), per.writeChoice(0),
	    per.writeSelection(0x08), per.writeNumericString("1", 1), per.writePadding(1),
	    per.writeNumberOfSet(1), per.writeChoice(0xc0),
	    per.writeOctetStream(new Buffer(h221_cs_key), 4), per.writeOctetStream(userDataStream.getValue())
    ]);
}