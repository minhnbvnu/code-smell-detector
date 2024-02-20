function signalSet(n){
	var signals=[];
	for (var i=0; (i<=n)&&(i<presetLogLists.length) ; i++){
		for (var j=0; j<presetLogLists[i].length; j++){
			signals.push(presetLogLists[i][j]);
		}
	}
	return signals;
}