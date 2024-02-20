function updateMarkerForPartParam() {
	var markerContent = "<marker><prop.list><prop.pair><key>comment</key><string>" + $("#Comment").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>startTime</key><string>" + $("#InPoint").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>duration</key><string>" + $("#Duration").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>name</key><string>" + $("#Name").val() + "</string></prop.pair>";
	markerContent += "<prop.pair><key>type</key><string>" + $("#Type").val() + "</string></prop.pair>";
	if (($("#CuePointParam").val() != '' && cuePointParamMap[customCuePointKey] == undefined)
		|| (cuePointParamMap[customCuePointKey] != undefined && $("#CuePointParam").val() != cuePointParamMap[customCuePointKey]))
	{
		cuePointParamMap[customCuePointKey] = $("#CuePointParam").val();
		markerContent += "<prop.pair><key>cuePointParams</key><prop.list>";
		$.each(cuePointParamMap, function(key, value){
			markerContent += "<prop.pair><key>" + key + "</key><string>" + value + "</string></prop.pair>";
		});
		markerContent += "</prop.list></prop.pair>";
	}
	markerContent += "<prop.pair><key>guid</key><string>" + latestMarkerID + "</string></prop.pair></prop.list></marker>";
	evalScript('$._ext_PPRO.updateMarker("' + markerContent + '")');
}