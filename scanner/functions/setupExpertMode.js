function setupExpertMode(isOn){
	document.getElementById('expertControlPanel').style.display = 'block';
	if(loglevel==0)
		updateLoglevel(1);
	if(chipLayoutIsVisible)
		document.getElementById('layoutControlPanel').style.display = 'block';
}