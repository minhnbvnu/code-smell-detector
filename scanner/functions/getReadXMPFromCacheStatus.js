function getReadXMPFromCacheStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to read XMP from cache status event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultReadXMPStatus = parseReadXMPStatus(xmlDoc);
		console.log(resultReadXMPStatus);
		$('#result').html(resultReadXMPStatus);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#result').html('<h3>Result</h3>');
	}
	
	$("#result").accordion("refresh");
}