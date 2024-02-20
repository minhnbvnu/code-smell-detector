function updateLoglevel(value){
	loglevel = value;
	logThese = signalSet(loglevel);
	initLogbox(logThese);
}