function writeXMPToDisk()
{
	var arrayFile = getAssetPathAndType();
	var path = arrayFile.sPath;
	var type = arrayFile.sType;
	
	if (path != "")
	{
		var event = new CSEvent("com.adobe.browser.event.WriteXMPToDisk", "APPLICATION");
		var taskID = newGuid();
		var msgID = newGuid();
		var assetID = newGuid();
		var xmpContent = $('#xmpcontent').val();
		
		var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/><assetMediaInfoList><assetMediaInfo><filePath path="' + path + '"/><assetID ID="' + assetID + '"/><type>' + type + '</type><changePath path=""/><fileMetadata><xmp><![CDATA[' + xmpContent + ']]></xmp></fileMetadata></assetMediaInfo></assetMediaInfoList></browserMessage>';
		console.log("[Send message to browser to write XMP to disk]: %s", messageXML);
		event.data = messageXML;
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
	else
	{
		$('#result').html("");
	}
}