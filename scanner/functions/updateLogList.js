function updateLogList(names){
	// user supplied a list of signals, which we append to the set defined by loglevel
	logThese = signalSet(loglevel);
	if(typeof names == "undefined")
		// this is a UI call - read the text input
		names = document.getElementById('LogThese').value;
	else
		// this is an URL call - update the text input box
		document.getElementById('LogThese').value = names;
	names = names.split(/[\s,]+/);
	for(var i=0;i<names.length;i++){
		// could be a signal name, a node number, or a special name
		if(typeof busToString(names[i]) != "undefined")
			logThese.push(names[i]);
	}
	initLogbox(logThese);
}