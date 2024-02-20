function read_directory(dir_start, sector_list, sectors, Paths, nmfs, files, FileIndex, mini) {
	var minifat_store = 0, pl = (Paths.length?2:0);
	var sector = sector_list[dir_start].data;
	var i = 0, namelen = 0, name;
	for(; i < sector.length; i+= 128) {
		var blob = sector.slice(i, i+128);
		prep_blob(blob, 64);
		namelen = blob.read_shift(2);
		name = __utf16le(blob,0,namelen-pl);
		Paths.push(name);
		var o = ({
			name:  name,
			type:  blob.read_shift(1),
			color: blob.read_shift(1),
			L:     blob.read_shift(4, 'i'),
			R:     blob.read_shift(4, 'i'),
			C:     blob.read_shift(4, 'i'),
			clsid: blob.read_shift(16),
			state: blob.read_shift(4, 'i'),
			start: 0,
			size: 0
		});
		var ctime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
		if(ctime !== 0) o.ct = read_date(blob, blob.l-8);
		var mtime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
		if(mtime !== 0) o.mt = read_date(blob, blob.l-8);
		o.start = blob.read_shift(4, 'i');
		o.size = blob.read_shift(4, 'i');
		if(o.size < 0 && o.start < 0) { o.size = o.type = 0; o.start = ENDOFCHAIN; o.name = ""; }
		if(o.type === 5) { /* root */
			minifat_store = o.start;
			if(nmfs > 0 && minifat_store !== ENDOFCHAIN) sector_list[minifat_store].name = "!StreamData";
			/*minifat_size = o.size;*/
		} else if(o.size >= 4096 /* MSCSZ */) {
			o.storage = 'fat';
			if(sector_list[o.start] === undefined) sector_list[o.start] = get_sector_list(sectors, o.start, sector_list.fat_addrs, sector_list.ssz);
			sector_list[o.start].name = o.name;
			o.content = (sector_list[o.start].data.slice(0,o.size));
		} else {
			o.storage = 'minifat';
			if(o.size < 0) o.size = 0;
			else if(minifat_store !== ENDOFCHAIN && o.start !== ENDOFCHAIN && sector_list[minifat_store]) {
				o.content = get_mfat_entry(o, sector_list[minifat_store].data, (sector_list[mini]||{}).data);
			}
		}
		if(o.content) prep_blob(o.content, 0);
		files[name] = o;
		FileIndex.push(o);
	}
}