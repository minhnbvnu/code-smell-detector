function get_sector_list(sectors, start, fat_addrs, ssz, chkd) {
	var buf = [], buf_chain = [];
	if(!chkd) chkd = [];
	var modulus = ssz - 1, j = 0, jj = 0;
	for(j=start; j>=0;) {
		chkd[j] = true;
		buf[buf.length] = j;
		buf_chain.push(sectors[j]);
		var addr = fat_addrs[Math.floor(j*4/ssz)];
		jj = ((j*4) & modulus);
		if(ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 "+ssz);
		if(!sectors[addr]) break;
		j = __readInt32LE(sectors[addr], jj);
	}
	return {nodes: buf, data:__toBuffer([buf_chain])};
}