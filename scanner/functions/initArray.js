function initArray( length, value) {
	var tmp = [];
	tmp[length-1] = value;
	return tmp.map(function(i) {return value;});
}