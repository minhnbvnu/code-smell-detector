function isSingleCap(str) {
	if (!str || str.length !== 1) { return false; }
  return str.toLowerCase() !== str;
}