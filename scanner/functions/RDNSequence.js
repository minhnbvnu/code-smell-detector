function RDNSequence() {
	return new asn1.univ.SequenceOf(RelativeDistinguishedName);
}