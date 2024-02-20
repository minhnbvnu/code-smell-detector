function TransferToFTP()
{
	var serverDest = $("#serverDest").val();
	var serverName = $("#serverName").val();
	var port = $("#port").val();
	var userName = $("#userName").val();
	var password = $("#password").val();
	var error = false;
	
	if (serverDest == "")
	{
		$("#serverDest").toggle( "highlight" );
		$("#serverDest").toggle( "highlight" );
		error = true;
	}

	if (serverName == "")
	{
		$("#serverName").toggle( "highlight" );
		$("#serverName").toggle( "highlight" );
		error = true;
	}
	
	if (port == "")
	{
		$("#port").toggle( "highlight" );
		$("#port").toggle( "highlight" );
		error = true;
	}

	if (userName == "")
	{
		$("#userName").toggle( "highlight" );
		$("#userName").toggle( "highlight" );
		error = true;
	}

	if (password == "")
	{
		$("#password").toggle( "highlight" );
		$("#password").toggle( "highlight" );
		error = true;
	}

	if (error == true)
	{
		$("#startTransfer").removeAttr("disabled");
		transferEnabled = true;
		return;
	}

	$("#progressbar").show();
	$("#progressbar" ).progressbar("value", 0);

	var transferItemList = '';

	for (var i=0; i<selectedItemInfoList.length; i++)
	{		
		transferItemList += '<transferItem src="'+selectedItemInfoList[i].getElementsByTagName('filePath')[0].attributes['path'].value+'" dstParent="'+serverDest+'"/>';
	}

	var event = new CSEvent("com.adobe.browser.event.TransferRequest", "APPLICATION");
	taskID = newGuid();
	var msgID = newGuid();

	var serverInfo = '<transferType>ftp|local</transferType><ftpSetting ftpServerName="'+serverName+'" ftpPort="'+port+'" ftpUserName="'+userName+'" ftpPassword="'+password+'"/>';

	var messageXML = '<browserMessage><browserID ID="EABROWSER_SOURCE"/><taskID ID="'+taskID+'"/><msgID ID="'+msgID+'"/><transferItemList>'+transferItemList+'</transferItemList><transferOption>Overwrite</transferOption>'+serverInfo+'</browserMessage>';
	console.log("[Send message to browser to start transfer]:%s", messageXML);
	event.data = messageXML;
	csInterface.dispatchEvent(event);
	$('#apimessage').val($('#apimessage').val() + "*** [" + (new Date()).toLocaleString() + "] Message from [" + event.type + "] ***\n" + messageXML + "\n\n");
}