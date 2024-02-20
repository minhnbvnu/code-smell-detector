function parseIsPremiereProInstalledStatus(xmlDoc)
{
	var resultIsPremiereProInstalled = "";
	if (xmlDoc != null)
	{
		resultIsPremiereProInstalled = xmlDoc.getElementsByTagName('installed')[0].firstChild.nodeValue;
	}

	return resultIsPremiereProInstalled;
}