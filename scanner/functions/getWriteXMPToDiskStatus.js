function getWriteXMPToDiskStatus(event)
{
	var xmlContent = event.data;
	console.log("[Response to write XMP to disk status event], received data is: %s", xmlContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmlContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmlContent);
	if (xmlDoc != null)
	{
		var resultWriteXMPStatus = parseWriteXMPStatus(xmlDoc);
		console.log(resultWriteXMPStatus);
		$('#result').html(resultWriteXMPStatus);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#result').html("");
	}
}