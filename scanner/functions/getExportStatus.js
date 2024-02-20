function getExportStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to export status event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultExportStatus = parseExportStatus(xmlDoc);
		var o = document.getElementById("result");
		o.value = resultExportStatus;
	}
	else
	{
		console.log("[Can not parse xml document]");
	}
}