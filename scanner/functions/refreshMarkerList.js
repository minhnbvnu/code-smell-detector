function refreshMarkerList(event) {

	var changeEnable = true;
	if (changeEnable)
	{	
		var xmpContent = event.data;	
		$("#markerContent").val(xmpContent);
		console.log("[Response to marker selected event], received data is%s:", xmpContent);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
		
		var xmlDoc = getXMLDoc(xmpContent);
		if (xmlDoc != null)
		{
			var selectedItemHTML = parseSelectedMarker(xmlDoc);
				
			if (markerList.length>0)
			{
				$('#markerList').html(selectedItemHTML);
			}
			else
			{
				$('#markerList').html("<h3>No Selection</h3>");
			}
		}
		else
		{
			console.log("[can not parse ]");
		}
	}
	else 
	{
		console.log("[Response to asset selected event is disabled]");
	}
}