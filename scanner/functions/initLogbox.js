function initLogbox(names){
	logbox=document.getElementById('logstream');
	if(logbox==null)return;

	names=names.map(function(x){return x.replace(/^-/,'')});
	logStream = [];
	logStream.push("<td class=header>" + names.join("</td><td class=header>") + "</td>");
	logbox.innerHTML = "<tr>"+logStream.join("</tr><tr>")+"</tr>";
}