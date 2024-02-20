function decodeTag(s, tag) {
	var nextTag = new type.UInt8().read(s).value;
	if (tag.tagNumber > 30) {
		nextTagNumber = new type.UInt8().read(s).value;
	}
	else {
		nextTagNumber = nextTag & 0x1F;
	}
	
	return ((nextTag & 0xE0) === (tag.tagClass | tag.tagFormat)) && (nextTagNumber === tag.tagNumber);
}