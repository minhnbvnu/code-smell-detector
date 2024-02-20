function runChip(){
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	start.style.visibility = 'hidden';
	stop.style.visibility = 'visible';
	if(typeof running == "undefined")
		initChip();
	running = true;
        go();
}