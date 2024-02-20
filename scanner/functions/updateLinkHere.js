function updateLinkHere(){
	var target = location.pathname + "?nosim=t&";
	var findlist = document.getElementById('HighlightThese').value.split(/[\s,]+/).join(",");
	if (findlist != "")
		target = target + "find=" + findlist + "&";
	target = target + whereAmIAsQuery();
	document.getElementById('linkHere').href=target;
}