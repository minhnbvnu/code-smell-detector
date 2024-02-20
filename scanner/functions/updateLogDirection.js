function updateLogDirection(){
	var loglines=[];
	logboxAppend=!logboxAppend;
	// the first element is the header so we can't reverse()
	for (var i=1;i<logStream.length;i++) {
		loglines.unshift(logStream[i]);
	}
	loglines.unshift(logStream[0]);
	logStream=loglines;
	logbox.innerHTML = "<tr>"+logStream.join("</tr><tr>")+"</tr>";
}