function generateSymbolTests() {
	var outhtml, res, outstr;
	for (var i=0; i<asciimath.AMnames.length;i++) {
		res = asciimath.parseMath(asciimath.AMnames[i]);
		outhtml = $(res).find("mstyle").html().replace(/\\/g,"\\\\").replace(/"/g,'\\"');
		outstr += '{input: "'+asciimath.AMnames[i].replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'", output:"'+outhtml+'"},\n';
	}
	$("#newtestout").text(outstr);	
}