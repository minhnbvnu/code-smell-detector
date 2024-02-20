function make_sector_list(sectors, dir_start, fat_addrs, ssz) {
	var sl = sectors.length, sector_list = ([]);
	var chkd = [], buf = [], buf_chain = [];
	var modulus = ssz - 1, i=0, j=0, k=0, jj=0;
	for(i=0; i < sl; ++i) {
		buf = ([]);
		k = (i + dir_start); if(k >= sl) k-=sl;
		if(chkd[k]) continue;
		buf_chain = [];
		for(j=k; j>=0;) {
			chkd[j] = true;
			buf[buf.length] = j;
			buf_chain.push(sectors[j]);
			var addr = fat_addrs[Math.floor(j*4/ssz)];
			jj = ((j*4) & modulus);
			if(ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 "+ssz);
			if(!sectors[addr]) break;
			j = __readInt32LE(sectors[addr], jj);
		}
		sector_list[k] = ({nodes: buf, data:__toBuffer([buf_chain])});
	}
	return sector_list;
}