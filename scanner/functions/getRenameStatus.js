function getRenameStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to rename status event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultRenameStatus = parseRenameStatus(xmlDoc);
		$('#result').html(resultRenameStatus);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#result').html("");
	}
}