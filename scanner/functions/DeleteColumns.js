function DeleteColumns(columnName)
{
	var event = new CSEvent("com.adobe.browser.event.DeleteDynamicColumns", "APPLICATION");
	taskID = newGuid();
	var msgID = newGuid();

	var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'
		+taskID
		+'"/><msgID ID="'
		+msgID
		+'"/>'
		+'<deleteDynamicColumns>'
			+'<dynamicColumn ID="'+columnNameIDs[columnName]+'"></dynamicColumn>'
		+'</deleteDynamicColumns>'
		+'</browserMessage>';
	console.log("[Send message to browser to start DeleteDynamicColumns]:%s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}