function captureSuccess(s) {
	console.log("Success");
	console.dir(s[0]);
	var v = "<video controls='controls'>";
	v += "<source src='" + s[0].fullPath + "' type='video/mp4'>";
	v += "</video>";
	document.querySelector("#videoArea").innerHTML = v;
}