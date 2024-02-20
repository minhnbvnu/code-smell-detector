function getMediaPropertyInfo()
{
	var table = '';
	if (selectedItemInfoList != null)
	{
		if (selectedItemInfoList.length == 1)
		{
			var event = new CSEvent("com.adobe.browser.event.GetMediaPropertyInfo", "APPLICATION");
	
			taskID = newGuid();
			var messageID = newGuid();
			var assetID = newGuid();
			mediaPath = selectedItemInfoList[0].getElementsByTagName('filePath')[0].attributes['path'].value;
			$("#properties").html("Trying to get media info of<br /> "+mediaPath+"<br />Plese Wait. ");

			var messageXML = '<browserMessage><browserID ID="EABROWSER"/><taskID ID="'+taskID+'"/><msgID ID="'+messageID+'"/><mediaPropertyInfo><assetID ID="'+assetID+'"/><filePath path="'+mediaPath+'"/></mediaPropertyInfo></browserMessage>';
			console.log("[Send message to browser to get media info]:%s", messageXML);
			event.data = messageXML;
			csInterface.dispatchEvent(event);
			$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
		}
	}
}