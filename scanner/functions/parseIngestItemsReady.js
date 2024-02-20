function parseIngestItemsReady(xmlDoc)
{
	var resultIngestItemsReady = "";
	if (xmlDoc != null)
	{
		var ingestItems = xmlDoc.getElementsByTagName('ingestItemList')[0];
		var ingestItemsNodes = ingestItems.childNodes;
		if (ingestItemsNodes)
		{
			resultIngestItemsReady = '<ol type="1">';
			for (var i = 0; i < ingestItemsNodes.length; i++)
			{
				resultIngestItemsReady += '<li><b>Path</b>: ' + ingestItemsNodes[i].getElementsByTagName('filePath')[0].getAttribute("path") + '<br>';
				resultIngestItemsReady += '<b>Alias Name</b>: ' + ingestItemsNodes[i].getElementsByTagName('aliasName')[0].firstChild.nodeValue + '</li>';
			}
			resultIngestItemsReady += '</ol>';
		}
	}
	
	return resultIngestItemsReady;
}