function submitRenameRequest()
{
	var newName = $("#newname").val();
	var filePath1 = $('#filepath1').val();
	var filePath2 = $('#filepath2').val();
	var newName1 = $("#newname1").val();
	var newName2 = $("#newname2").val();
	var renameItemList = "";
	
	if (filePath1 != "" && newName1 != "")
	{
		renameItemList += '<renameItem src="' + filePath1 + '" newName="' + newName1 + '"/>';
	}
	
	if (filePath2 != "" && newName2 != "")
	{
		renameItemList += '<renameItem src="' + filePath2 + '" newName="' + newName2 + '"/>';
	}
	
	if (renameItemList != "")
	{
		var event = new CSEvent("com.adobe.browser.event.RenameRequest", "APPLICATION");
		var taskID = newGuid();
		var msgID = newGuid();
		
		var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/><renameItemList>' + renameItemList + '</renameItemList></browserMessage>';
		console.log("[Send message to browser to rename]: %s", messageXML);
		event.data = messageXML;
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
	else
	{
		$('#result').html("");
	}
}