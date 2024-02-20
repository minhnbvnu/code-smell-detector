function TransferToLocal()
{
	var dst = $("#dest").val();
	if (dst != "")
	{		
		var transferItemList = '';

		for (var i=0; i<selectedItemInfoList.length; i++)
		{		
			transferItemList += '<transferItem src="'+selectedItemInfoList[i].getElementsByTagName('filePath')[0].attributes['path'].value+'" dstParent="'+dst+'"/>';
		}

		var event = new CSEvent("com.adobe.browser.event.TransferRequest", "APPLICATION");
		taskID = newGuid();
		var msgID = newGuid();

		var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'+taskID+'"/><msgID ID="'+msgID+'"/><transferItemList>'+transferItemList+'</transferItemList><transferOption>Overwrite</transferOption></browserMessage>';
		console.log("[Send message to browser to start transfer]:%s", messageXML);
		event.data = messageXML;
		csInterface.dispatchEvent(event);
		$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
		$("#progressbar").show();
		$("#progressbar" ).progressbar("value", 0);
	}
	else
	{
		transferEnabled = true;
		$("#startTransfer").removeAttr("disabled");
		$("#dest").toggle( "highlight" );
		$("#dest").toggle( "highlight" );
		console.log("[Empty distination is not allowed]");
	}
}