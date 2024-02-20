function getOpenIngestDialogStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to open ingest dialog status changed event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultOpenIngestDialog = parseOpenIngestDialogStatus(xmlDoc);
		var o = document.getElementById("result");
		o.value = resultOpenIngestDialog;
	}
	else
	{
		console.log("[Can not parse xml document]");
	}
}