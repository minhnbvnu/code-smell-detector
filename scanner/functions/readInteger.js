function readInteger(s) {
	var result;
	var size = readLength(s);
	switch(size) {
	case 1:
		result = new type.UInt8();
		break;
	case 2:
		result = new type.UInt16Be();
		break;
	case 4:
		result = new type.UInt32Be();
		break;
	default:
		throw new error.UnexpectedFatalError('NODE_RDP_PROTOCOL_T125_PER_BAD_INTEGER_LENGTH');
	}
	return result.read(s).value;
}