function DomainParameters(maxChannelIds, maxUserIds, maxTokenIds, 
		numPriorities, minThoughput, maxHeight, maxMCSPDUsize, protocolVersion) {
	return new asn1.univ.Sequence({
		maxChannelIds : new asn1.univ.Integer(maxChannelIds),
		maxUserIds : new asn1.univ.Integer(maxUserIds),
		maxTokenIds : new asn1.univ.Integer(maxTokenIds),
		numPriorities : new asn1.univ.Integer(numPriorities),
		minThoughput : new asn1.univ.Integer(minThoughput),
		maxHeight : new asn1.univ.Integer(maxHeight),
		maxMCSPDUsize : new asn1.univ.Integer(maxMCSPDUsize),
		protocolVersion : new asn1.univ.Integer(protocolVersion)
	});
}