function parseOpenIngestDialogStatus(xmlDoc)
{
	var resultOpenIngestDialog = "";
	if (xmlDoc != null)
	{
		resultOpenIngestDialog = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
	}
	
	return resultOpenIngestDialog;
}