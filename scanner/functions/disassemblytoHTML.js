function disassemblytoHTML(byte){
	var opcode=disassembly[byte];
	if(typeof opcode == "undefined")
		return "unknown"
	return opcode.replace(/ /,'&nbsp;');
}