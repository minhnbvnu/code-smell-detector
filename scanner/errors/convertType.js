function convertType(field, val) {
	const { fieldType, fieldLen } = field;
	switch (fieldType) {
		case 0:
		case 5:
		case 4:
		case 18:
			return parseFloat(val);
		case 246:
			return val;
		case 1:
		case 2:
		case 3:
		case 9:
			return parseInt(val);
		case 8:
			if (Number(val) < Number.MIN_SAFE_INTEGER || Number(val) > Number.MAX_SAFE_INTEGER) {
				return BigInt(val);
			} else {
				return parseInt(val);
			}
		case 15:
		case 253:
		case 254:
		case 11:
		case 19:
			return val;
		case 10:
		case 7:
		case 12:
		case 14:
		case 17:
		case 18:
			return new Date(val);
		default:
			return val;
	}
}