function parseSelectedAsset(xmlDoc)
{
	var table = "";
	var type = "";
	var aliasName = "";
	var path = "";

	if (xmlDoc != null)
	{
		selectedItemInfoList = xmlDoc.getElementsByTagName("selectedItemInfo");
		
		var table = "";
		for (var i=0; i<selectedItemInfoList.length; i++)
		{
			
			type = selectedItemInfoList[i].getElementsByTagName("type")[0].firstChild.nodeValue;
			aliasName = selectedItemInfoList[i].getElementsByTagName("aliasName")[0].firstChild.nodeValue;
			path = selectedItemInfoList[i].getElementsByTagName("filePath")[0].attributes["path"].value;
			
			table += '<h3>' + aliasName + '</h3>';
			table += '<div><p><b>Path</b> : ' + path + '<br>';
			table += '<b>Type</b> : ' + type + '<br>';
			table += '<b>Alias Name</b> : ' + aliasName + '</p>';
			if (type == "subClip")
			{
				
				subClipInfo = selectedItemInfoList[i].getElementsByTagName('subClipInfo')[0];
				table += '<ul><li>StartTime : '+subClipInfo.getElementsByTagName('startTime')[0].firstChild.nodeValue+'</li>';
				table += '<li>EndTime : '+subClipInfo.getElementsByTagName('duration')[0].firstChild.nodeValue+'</li>'
				table += '<li>MarkerID : '+subClipInfo.getElementsByTagName('markerID')[0].firstChild.nodeValue+'</li></ul>';
			}
			table += '</div>';
		}
	}

	return table;
}