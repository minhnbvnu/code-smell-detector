function addMarker() {
	var markerContent = $("#changedMarkerContent").val();
	markerContent = markerContent.replace(/\r/g, "");
	markerContent = markerContent.replace(/\n/g, "");
	evalScript('$._ext_PPRO.addMarker("' + markerContent + '")');
}