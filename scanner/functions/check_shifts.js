function check_shifts(blob, mver) {
	var shift = 0x09;

	// Byte Order
	//blob.chk('feff', 'Byte Order: '); // note: some writers put 0xffff
	blob.l += 2;

	// Sector Shift
	switch((shift = blob.read_shift(2))) {
		case 0x09: if(mver != 3) throw new Error('Sector Shift: Expected 9 saw ' + shift); break;
		case 0x0c: if(mver != 4) throw new Error('Sector Shift: Expected 12 saw ' + shift); break;
		default: throw new Error('Sector Shift: Expected 9 or 12 saw ' + shift);
	}

	// Mini Sector Shift
	blob.chk('0600', 'Mini Sector Shift: ');

	// Reserved
	blob.chk('000000000000', 'Reserved: ');
}