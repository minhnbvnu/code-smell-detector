function refreshReceivedMessage(event)
{
	var xmpContent = event.data;
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	
	var xmlDoc = createXMLDocObject(xmpContent);
	if (xmlDoc != null)
	{
		resultCode = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
		var o = document.getElementById("result");
		o.value = resultCode;
	}
	else
	{
	}
}