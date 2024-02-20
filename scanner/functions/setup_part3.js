function setup_part3(){
	loadProgram();
	writeTriggers={};  // kiosk mode does not handle I/O
	initChip();
	document.getElementById('stop').style.visibility = 'hidden';
	go();
}