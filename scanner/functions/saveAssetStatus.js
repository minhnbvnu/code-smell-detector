function saveAssetStatus(event)
{
	var xmpContent = event.data;	
	//xmpContent = '<hostNotification><browserID ID="MediaCollection"/><msgID ID="879a2379-fdbc-4107-86fe-5abbb4c62940"/><taskID ID="879a2379-fdbc-4107-86fe-5abbb4c62940"/><selectedItemInfoList><selectedItemInfo><filePath path="D:\Workspace\testmedia\XDCAMHD250\Clip\C0001.MXF"/><aliasName>C0001</aliasName><type>masterClip</type></selectedItemInfo></selectedItemInfoList></hostNotification>';

	var xmlDoc = getXMLDoc(xmpContent);
	console.log("[Response to save asset status event], received data is%s:", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	if (xmlDoc != null)
	{
		var resultHTML = parsePathFromResponse(xmlDoc);

		if (resultHTML != "")
		{
			$("#saveAssetResult").html("Asset "+resultHTML+" is saved.");
		}
	}
	else
	{

	}
}