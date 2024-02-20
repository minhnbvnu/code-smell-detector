function getCurrentWorkModeStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to current work mode status changed event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultCurrentWorkMode = parseCurrentWorkModeStatus(xmlDoc);
		var o = document.getElementById("result");
		o.value = resultCurrentWorkMode;
	}
	else
	{
	}
}