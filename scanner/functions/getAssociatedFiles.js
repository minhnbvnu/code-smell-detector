function getAssociatedFiles()
{
	if (selectedItemInfoList.length>1)
	{
		$('#result').html('<font color=red>Only one asset should be selected.</font>');
	}
	else
	{
		var path = selectedItemInfoList[0].getElementsByTagName("filePath")[0].getAttribute("path");
		var event = new CSEvent("com.adobe.browser.event.GetAssociatedFiles", "APPLICATION");
		var taskID = newGuid();
		var msgID = newGuid();
		
		var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/><filePath path="' + path + '"/></browserMessage>';
		console.log("[Send message to browser to get associated files]: %s", messageXML);
		event.data = messageXML;
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
}