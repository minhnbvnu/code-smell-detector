function stepForward(){
	if(typeof running == "undefined")
		initChip();
	stopChip();
	step();
}