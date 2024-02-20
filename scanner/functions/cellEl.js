function cellEl(n){
	var r = n>>4;
	var c = n%16;
	var e = table.childNodes[r].childNodes[c+1];
	return e;
}