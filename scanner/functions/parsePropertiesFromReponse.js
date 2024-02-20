function parsePropertiesFromReponse(xmlDoc)
{
	
	var result = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
	var ret_taskID = xmlDoc.getElementsByTagName('taskID')[0].attributes['ID'].value;

	if (ret_taskID == taskID)
	{
		if (result == 'ERROR')
		{
			return "Failed to get media info.";
		}
		else
		{
			var mediaPropertyInfo = xmlDoc.getElementsByTagName('mediaPropertyInfo')[0];
			filePath = mediaPropertyInfo.getElementsByTagName('filePath')[0].attributes['path'].value;

			frameRate = "None";
			if (mediaPropertyInfo.getElementsByTagName('frameRate').length != 0)
			{
				frameRate = mediaPropertyInfo.getElementsByTagName('frameRate')[0].firstChild.nodeValue;
			}
			
			startTime = mediaPropertyInfo.getElementsByTagName('startTime')[0].firstChild.nodeValue;
			duration = mediaPropertyInfo.getElementsByTagName('duration')[0].firstChild.nodeValue;

			resultHTML = '<ul><li><b>FilePath</b>&nbsp;:&nbsp;'+filePath+'</li><li><b>frameRate</b>&nbsp;:&nbsp;'+frameRate+'</li><li><b>startTime</b>&nbsp;:&nbsp;'+startTime+'</li><li><b>duration</b>&nbsp;:&nbsp;'+duration+'</li></ul>';
			return resultHTML;
		}
	}
	else
	{
		return "";
	}
}