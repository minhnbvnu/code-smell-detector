function ber_next(bytes, from, to) {
	if (!from) from = 0;
	if (!to) to = bytes.length;
	let ptr = from;
	const type = bytes[ptr++];
	let size = bytes[ptr++];
	if ((size & 128) > 0) {
		let ext = size - 128;
		size = 0;
		while (--ext >= 0) {
			size = (size << 8) + bytes[ptr++];
		}
	}
	let value = null;
	if (type === 48) {
		value = ber_sequence(bytes, ptr, size);
	} else if (type === 2) {
		value = ber_integer(bytes, ptr, size);
	} else if (type === 3) {
		value = ber_sequence(bytes, ptr + 1, size - 1);
	} else if (type === 5) {
		value = null;
	} else if (type === 6) {
		value = ber_oid(bytes, ptr, size);
	} else {
		value = ber_unknown(bytes, ptr, size);
	}
	return {
		totalLength: ptr - from + size,
		type,
		length: size,
		value,
	};
}