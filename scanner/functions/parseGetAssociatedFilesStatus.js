function parseGetAssociatedFilesStatus(xmlDoc)
{
	var resultGetAssociatedFilesStatus = "";
	if (xmlDoc != null)
	{
		var parseSucceed = false;
		var files = xmlDoc.getElementsByTagName('fileList')[0];
		if (files)
		{
			var filesNodes = files.childNodes;
			if (filesNodes)
			{
				if (filesNodes.length > 0)
				{
					resultGetAssociatedFilesStatus = '<ul>';
					for (var i = 0; i < filesNodes.length; i++)
					{
						resultGetAssociatedFilesStatus += '<li>' + filesNodes[i].getAttribute("path") + '</li>';
					}
					resultGetAssociatedFilesStatus += '</ul>';
					parseSucceed = true;
				}
			}
		}
		if (!parseSucceed)
		{
			console.log("[Can not find fileList in xml document]");
			resultGetAssociatedFilesStatus = 'Associated Files Not Found';
		}
	}
	
	return resultGetAssociatedFilesStatus;
}