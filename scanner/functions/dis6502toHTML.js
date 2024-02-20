function dis6502toHTML(byte){
	var opcode=dis6502[byte];
	if(typeof opcode == "undefined")
		return "unknown"
	return opcode.replace(/ /,'&nbsp;');
}