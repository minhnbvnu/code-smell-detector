function parseExportStatus(xmlDoc)
{
	var resultExportStatus = "";
	if (xmlDoc != null)
	{
		resultExportStatus = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
	}
	
	return resultExportStatus;
}