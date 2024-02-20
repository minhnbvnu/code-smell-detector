function updateLogbox(names){
	var signals=[];
	var odd=true;
	var bg;
	var row;

	for(var i in names){
		if(cycle % 4 < 2){
			bg = odd ? " class=oddcol":"";
		} else {
			bg = odd ? " class=oddrow":" class=oddrowcol";
		}
		signals.push("<td" + bg + ">" + busToString(names[i]) + "</td>");
		odd =! odd;
	}
	row = "<tr>" + signals.join("") + "</tr>";
	if(logboxAppend)
	        logStream.push(row);
	else
		logStream.splice(1,0,row);

	logbox.innerHTML = logStream.join("");
}