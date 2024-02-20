function getAssociatedFilesStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to get associated files status event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultGetAssociatedFilesStatus = parseGetAssociatedFilesStatus(xmlDoc);
		console.log(resultGetAssociatedFilesStatus);
		$('#result').html(resultGetAssociatedFilesStatus);
	}
	else
	{
		console.log("[Can not parse xml document]");
		$('#result').html("");
	}
	
	//$("#result").accordion("refresh");
}