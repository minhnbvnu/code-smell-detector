function goForN(n){
	var n2=n;  // save our parameter so we can re-submit ourselves
	while(n--){
		halfStep();
		cycle++;
	}
	instantaneousHz();
	chipStatus();
	if((headlessSteps<0) && running){
		setTimeout("goForN("+n2+")",0); // re-submit ourselves if we are meant to free-run
		return;
	}
	running = false;
	var start = document.getElementById('start');
	var stop = document.getElementById('stop');
	start.style.visibility = 'visible';
	stop.style.visibility = 'hidden';
}