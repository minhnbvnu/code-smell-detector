function getAssetPathAndType()
{
	var path = "";
	var type = "";
	var filePath = $('#filepath').val();
	
	if (filePath != "")
	{
		path = filePath;
		type = "masterClip";
	}
	else
	{
		if (selectedItemInfoList != null)
		{
			if (selectedItemInfoList.length>1)
			{
				$('#result').html('<font color=red>Only one asset should be selected.</font>');
			}
			else
			{
				path = selectedItemInfoList[0].getElementsByTagName("filePath")[0].getAttribute("path");
				type = selectedItemInfoList[0].getElementsByTagName("type")[0].firstChild.nodeValue;
			}
		}
	}
	
	return {
		sPath: path,
		sType: type
	};
}