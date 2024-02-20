function getCurrentWorkMode()
{
	var event = new CSEvent("com.adobe.browser.event.GetCurrentWorkMode", "APPLICATION");
	var taskID = newGuid();
	var msgID = newGuid();

	var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/></browserMessage>';
	console.log("[Send message to browser to get current work mode]: %s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}