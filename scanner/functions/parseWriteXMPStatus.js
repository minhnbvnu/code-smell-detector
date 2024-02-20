function parseWriteXMPStatus(xmlDoc)
{
	var resultWriteXMPStatus = "";
	if (xmlDoc != null)
	{
		resultWriteXMPStatus = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
	}
	
	return resultWriteXMPStatus;
}