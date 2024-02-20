function markerDeleted(event) {
	var xmlContent = event.data;
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmlContent + "\n\n");
	
	$('#markerList').html("<h3>No Selection</h3>");
}