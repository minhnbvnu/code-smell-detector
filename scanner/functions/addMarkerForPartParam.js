function addMarkerForPartParam() {
	var markerContent = "<marker><prop.list><prop.pair><key>comment</key><string>" + $("#Comment").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>startTime</key><string>" + $("#InPoint").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>duration</key><string>" + $("#Duration").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>name</key><string>" + $("#Name").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>type</key><string>" + $("#Type").val() + "</string></prop.pair>";
	if ($("#CuePointParam").val() != '')
	{
		markerContent += "<prop.pair><key>cuePointParams</key><prop.list><prop.pair><key>" + customCuePointKey + "</key><string>" + $("#CuePointParam").val() + "</string></prop.pair></prop.list></prop.pair>";
	}
	markerContent += "<prop.pair><key>guid</key><string>" + newGuid() + "</string></prop.pair></prop.list></marker>";
	evalScript('$._ext_PPRO.addMarker("' + markerContent + '")');
}