function isPremiereProInstalled()
{
	var event = new CSEvent("com.adobe.browser.event.IsPremiereProInstalled", "APPLICATION");
	var taskID = newGuid();
	var msgID = newGuid();

	var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/></browserMessage>';
	console.log("[Send message to browser to get Premiere Pro installed]: %s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}