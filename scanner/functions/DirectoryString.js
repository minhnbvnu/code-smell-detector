function DirectoryString() {
	return new asn1.univ.Choice({
		teletexString : new asn1.univ.T61String(),
		printableString : new asn1.univ.PrintableString(),
		universalString : new asn1.univ.UniversalString(),
		utf8String : new asn1.univ.UTF8String(),
		bmpString : new asn1.univ.BMPString(),
		ia5String : new asn1.univ.IA5String()
	});
}