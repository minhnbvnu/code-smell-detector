function getIsPremiereProInstalledStatus(event)
{
	var xmpContent = event.data;
	console.log("[Response to Premiere Pro installed status changed event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		var resultIsPremiereProInstalled = parseIsPremiereProInstalledStatus(xmlDoc);
		var o = document.getElementById("result");
		o.value = resultIsPremiereProInstalled;
	}
	else
	{
	}
}