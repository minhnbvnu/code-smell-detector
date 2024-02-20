function parseRenameStatus(xmlDoc)
{
	var resultRenameStatus = "";
	if (xmlDoc != null)
	{
		resultRenameStatus = "<b>" + xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue + "</b>";
		var renameItems = xmlDoc.getElementsByTagName('actionResultList')[0];
		var renameItemsNodes = renameItems.childNodes;
		if (renameItemsNodes)
		{
			resultRenameStatus += '<ol type="1">';
			for (var i = 0; i < renameItemsNodes.length; i++)
			{
				resultRenameStatus += '<li>Result: ' + renameItemsNodes[i].getElementsByTagName('result')[0].firstChild.nodeValue + '<br>';
				resultRenameStatus += 'Source: ' + renameItemsNodes[i].getElementsByTagName('src')[0].getAttribute("path") + '<br>';
				resultRenameStatus += 'Destination: ' + renameItemsNodes[i].getElementsByTagName('dst')[0].getAttribute("path") + '</li>';
			}
			resultRenameStatus += '</ol>';
		}
	}
	
	return resultRenameStatus;
}