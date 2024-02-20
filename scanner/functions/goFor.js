function goFor(){
	var n = headlessSteps;  //  a negative value is a request to free-run
	if(headlessSteps<0)
		n=-n;
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	start.style.visibility = 'hidden';
	stop.style.visibility = 'visible';
	if(typeof running == "undefined") {
		initChip();
	}
	running = true;
	setTimeout("instantaneousHz(); goForN("+n+")",0);
}