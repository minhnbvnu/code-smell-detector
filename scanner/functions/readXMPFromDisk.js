function readXMPFromDisk()
{
	var arrayFile = getAssetPathAndType();
	var path = arrayFile.sPath;
	var type = arrayFile.sType;
	
	if (path != "")
	{
		var event = new CSEvent("com.adobe.browser.event.ReadXMPFromDisk", "APPLICATION");
		var taskID = newGuid();
		var msgID = newGuid();
		
		var assetID = newGuid();
		var messageXML = '<browserMessage><browserID ID="MediaCollection"/><taskID ID="' + taskID + '"/><msgID ID="' + msgID + '"/><assetMediaInfoList><assetMediaInfo><filePath path="' + path + '"/><assetID ID="' + assetID + '"/><type>' + type + '</type><fileMetadata><xmp/></fileMetadata></assetMediaInfo></assetMediaInfoList></browserMessage>';
		console.log("[Send message to browser to read XMP from disk]: %s", messageXML);
		event.data = messageXML;
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
	}
	else
	{
		$('#result').html("");
	}
}