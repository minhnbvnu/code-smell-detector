function refreshTransferStatus(event)
{
	var xmpContent = event.data;	
	//xmpContent = '<hostNotification><browserID ID="MediaCollection"/><msgID ID="879a2379-fdbc-4107-86fe-5abbb4c62940"/><taskID ID="879a2379-fdbc-4107-86fe-5abbb4c62940"/><selectedItemInfoList><selectedItemInfo><filePath path="D:\Workspace\testmedia\XDCAMHD250\Clip\C0001.MXF"/><aliasName>C0001</aliasName><type>masterClip</type></selectedItemInfo></selectedItemInfoList></hostNotification>';

	var xmlDoc = getXMLDoc(xmpContent);
	console.log("[Response to transfer status changed event], received data is%s:", xmpContent);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + xmpContent + "\n\n");
	if (xmlDoc != null)
	{
		var resultList = parseTransferStatus(xmlDoc);
		$("#result" ).text(resultList["ERROR"]+" failed, "+resultList["OK"]+" succeeded.");
		transferEnabled = true;
	}
	else
	{

	}
	taskID = null;
	$("#startTransfer").removeAttr("disabled");	
	$("#progressbar" ).progressbar("value",100);
}