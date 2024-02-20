function UpdateFieldValues(columnName)
{
    var value = $("#fieldValue").val();
	if (selectedItemInfoList == null || selectedItemInfoList.length == 0 || value == "")
		return;

	var event = new CSEvent("com.adobe.browser.event.UpdateDynamicColumnFields", "APPLICATION");
	taskID = newGuid();
	var msgID = newGuid();

	var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'
		+taskID
		+'"/><msgID ID="'
		+msgID
		+'"/>'
		+'<dynamicColumnFieldValues>';

	for (var i=0; i<selectedItemInfoList.length; i++)
	{
		selectedAssetID = selectedItemInfoList[i].getElementsByTagName('assetID')[0].attributes['ID'].value;
		messageXML += '<dynamicColumnFieldValue fieldValue="'+value+'">'
				+'<dynamicColumn ID="'+columnNameIDs[columnName]+'"></dynamicColumn>'
				+'<assetID ID="'+selectedAssetID+'"></assetID>'
				+'</dynamicColumnFieldValue>';
	}
	
	messageXML += '</dynamicColumnFieldValues></browserMessage>';
	console.log("[Send message to browser to start UpdateDynamicColumnFields]:%s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}