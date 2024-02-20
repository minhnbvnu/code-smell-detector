function cancelConcat()
{
	if (taskID != null)
	{
		var event = new CSEvent("com.adobe.browser.event.ConcatenationCancel", "APPLICATION");
		var msgID = newGuid();

		var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'+taskID+'"/><msgID ID="'+msgID+'"/></browserMessage>';
		event.data = messageXML;

		console.log("[Send message to browser to cancel concat]:%s", messageXML);
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
	
	taskID = null;
	concatEnabled = true;
	$("#startConcat").removeAttr("disabled");
}