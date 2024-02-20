function parse_zip(file, options) {
	var blob = file;
	prep_blob(blob, 0);

	var FileIndex = [], FullPaths = [];
	var o = {
		FileIndex: FileIndex,
		FullPaths: FullPaths
	};
	init_cfb(o, { root: options.root });

	/* find end of central directory, start just after signature */
	var i = blob.length - 4;
	while((blob[i] != 0x50 || blob[i+1] != 0x4b || blob[i+2] != 0x05 || blob[i+3] != 0x06) && i >= 0) --i;
	blob.l = i + 4;

	/* parse end of central directory */
	blob.l += 4;
	var fcnt = blob.read_shift(2);
	blob.l += 6;
	var start_cd = blob.read_shift(4);

	/* parse central directory */
	blob.l = start_cd;

	for(i = 0; i < fcnt; ++i) {
		/* trust local file header instead of CD entry */
		blob.l += 20;
		var csz = blob.read_shift(4);
		var usz = blob.read_shift(4);
		var namelen = blob.read_shift(2);
		var efsz = blob.read_shift(2);
		var fcsz = blob.read_shift(2);
		blob.l += 8;
		var offset = blob.read_shift(4);
		var EF = parse_extra_field(blob.slice(blob.l+namelen, blob.l+namelen+efsz));
		blob.l += namelen + efsz + fcsz;

		var L = blob.l;
		blob.l = offset + 4;
		parse_local_file(blob, csz, usz, o, EF);
		blob.l = L;
	}

	return o;
}