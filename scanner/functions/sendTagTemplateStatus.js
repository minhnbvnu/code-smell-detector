function sendTagTemplateStatus(event) 
{
	var xmpContent = event.data;
	console.log("[Response to current work mode status changed event], received data is: %s", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = getXMLDoc(xmpContent);
	if (xmlDoc != null)
	{
		var resultList = parseSendTagTempStatus(xmlDoc);
		$("#result" ).text(resultList["ERROR"]+" failed, "+resultList["OK"]+" succeeded.");
	}
	else
	{
	}
}