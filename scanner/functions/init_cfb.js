function init_cfb(cfb, opts) {
	var o = opts || {}, root = o.root || "Root Entry";
	if(!cfb.FullPaths) cfb.FullPaths = [];
	if(!cfb.FileIndex) cfb.FileIndex = [];
	if(cfb.FullPaths.length !== cfb.FileIndex.length) throw new Error("inconsistent CFB structure");
	if(cfb.FullPaths.length === 0) {
		cfb.FullPaths[0] = root + "/";
		cfb.FileIndex[0] = ({ name: root, type: 5 });
	}
	if(o.CLSID) cfb.FileIndex[0].clsid = o.CLSID;
	seed_cfb(cfb);
}