function refreshProgressBar(event)
{
	var xmpContent = event.data;	
	//xmpContent = '<hostNotification><browserID ID="EABROWSER_SOURCE"/><msgID ID="9063fb99-169d-4053-a889-bc0733f1eabc"/><taskID ID="672be504-39b2-3bd8-5156-44c826ce2288"/><percentage>10</percentage></hostNotification>';
	
	var xmlDoc = getXMLDoc(xmpContent);
	console.log("[Response to transfer progress changed event], received data is%s:", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	if (xmlDoc != null)
	{
		var percent = parseTransfterProgress(xmlDoc);
		$("#progressbar" ).progressbar("value", parseInt(percent));
	}
	else
	{
	}
}