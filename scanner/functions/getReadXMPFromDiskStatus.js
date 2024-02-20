function getReadXMPFromDiskStatus(event)
{
	var xmlContent = event.data;
	console.log("[Response to read XMP from disk status event], received data is: %s", xmlContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmlContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmlContent);
	if (xmlDoc != null)
	{
		var resultReadXMPStatus = parseReadXMPStatus(xmlDoc);
		console.log(resultReadXMPStatus);
		$('#xmpcontent').val(resultReadXMPStatus);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#xmpcontent').val("");
	}
}