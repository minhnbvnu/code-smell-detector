function parseCurrentWorkModeStatus(xmlDoc)
{
	var resultCurrentWorkMode = "";
	if (xmlDoc != null)
	{
		resultCurrentWorkMode = xmlDoc.getElementsByTagName('currentWorkMode')[0].firstChild.nodeValue;
	}

	return resultCurrentWorkMode;
}