function parseTransfterProgress(xmlDoc)
{
	var percent = 0;

	if (xmlDoc != null)
	{
		 percentList = xmlDoc.getElementsByTagName('percentage');

		 if (percentList.length>0)
		 {
			 percent = percentList[0].firstChild.nodeValue;
		 }
	}

	return percent;
}