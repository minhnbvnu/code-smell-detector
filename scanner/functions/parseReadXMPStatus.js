function parseReadXMPStatus(xmlDoc)
{
	var resultReadXMPStatus = "";
	if (xmlDoc != null)
	{
		resultReadXMPStatus = xmlDoc.getElementsByTagName('xmp')[0].firstChild.nodeValue;
	}
	
	return resultReadXMPStatus;
}