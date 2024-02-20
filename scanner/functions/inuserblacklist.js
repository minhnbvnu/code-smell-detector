function inuserblacklist(x, blacklist) {
	x = x.toLowerCase();
	return blacklist.indexOf(x) >= 0;
}