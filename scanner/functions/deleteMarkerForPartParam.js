function deleteMarkerForPartParam() {
	var markerContent = "<marker><prop.list><prop.pair><key>guid</key><string>" + latestMarkerID + "</string></prop.pair></prop.list></marker>";
	evalScript('$._ext_PPRO.deleteMarker("' + markerContent + '")');
}