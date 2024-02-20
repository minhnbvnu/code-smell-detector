function submitExportAsset()
{
	var event = new CSEvent("com.adobe.browser.event.ExportAsset", "APPLICATION");
	var taskID = newGuid();
	var msgID = newGuid();
	var assetID = "";
	var type = "";
	var aliasName = "";
	var path = "";
	var name = "";
	var assetMediaInfoList = '<assetMediaInfoList>';
	var assetItemList = '<assetItemList>';
	var mediaUseLocalFile = "true";
	var roughCutUseLocalFile = "true";
	
	for (var i=0; i<selectedItemInfoList.length; i++)
	{
		var assetID = newGuid();
		type = selectedItemInfoList[i].getElementsByTagName("type")[0].firstChild.nodeValue;
		aliasName = selectedItemInfoList[i].getElementsByTagName("aliasName")[0].firstChild.nodeValue;
		path = selectedItemInfoList[i].getElementsByTagName("filePath")[0].attributes["path"].value;
		name = path.split("\\").pop().split("/").pop();
		
		assetMediaInfoList += '<assetMediaInfo>';
		assetMediaInfoList += '<filePath path="' + path + '"/>';
		assetMediaInfoList += '<assetID ID="' + assetID + '"/>';
		assetMediaInfoList += '<type>' + type + '</type>';
		assetMediaInfoList += '<aliasName>' + aliasName + '</aliasName>';
		assetMediaInfoList += '<fileMetadata><xmp><![CDATA[...]]></xmp></fileMetadata>';
		assetMediaInfoList += '</assetMediaInfo>';
		
		assetItemList += '<assetItem order="' + (i+1) + '">';
		assetItemList += '<filePath path="' + path + '"/>';
		assetItemList += '<mediaInfoID ID="' + assetID + '"/>';
		assetItemList += '<parentAssetID ID="' + assetID + '"/>';
		assetItemList += '<assetID ID="' + assetID + '"/>';
		assetItemList += '<name>' + name + '</name>';
		assetItemList += '<type>' + type + '</type>';
		assetItemList += '</assetItem>';
	}
	assetMediaInfoList += '</assetMediaInfoList>';
	assetItemList += '</assetItemList>';
	
	var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/>' + assetMediaInfoList + assetItemList + '<mediaUseLocalFile>' + mediaUseLocalFile + '</mediaUseLocalFile><roughCutUseLocalFile>' + roughCutUseLocalFile + '</roughCutUseLocalFile></browserMessage>';
	console.log("[Send message to browser to export asset]: %s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}