function check_get_mver(blob) {
	if(blob[blob.l] == 0x50 && blob[blob.l + 1] == 0x4b) return [0, 0];
	// header signature 8
	blob.chk(HEADER_SIGNATURE, 'Header Signature: ');

	// clsid 16
	//blob.chk(HEADER_CLSID, 'CLSID: ');
	blob.l += 16;

	// minor version 2
	var mver = blob.read_shift(2, 'u');

	return [blob.read_shift(2,'u'), mver];
}