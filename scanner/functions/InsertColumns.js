function InsertColumns(columnName)
{
	var event = new CSEvent("com.adobe.browser.event.InsertDynamicColumns", "APPLICATION");
	taskID = newGuid();
	var msgID = newGuid();
	
	var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'
		+taskID
		+'"/><msgID ID="'
		+msgID
		+'"/>'
		+'<newDynamicColumns>'
			+'<dynamicColumn \n'
				+'ID="'+columnNameIDs[columnName]+'"\n'
				+'name="'+columnName+'"\n'
				+'previousColumnName="Name">\n'
				+'</dynamicColumn>\n'
		+'</newDynamicColumns>'
		+'</browserMessage>';
	console.log("[Send message to browser to start InsertDynamicColumns]:%s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}