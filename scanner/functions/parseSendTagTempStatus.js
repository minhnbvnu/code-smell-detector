function parseSendTagTempStatus(xmlDoc)
{
	var resultList = {'OK':0, 'ERROR':0};
	if (xmlDoc != null)
	{
		var actionResultList = xmlDoc.getElementsByTagName('tagTemplateResult');

		for (var i=0; i<actionResultList.length; i++)
		{
			result = actionResultList[i].getElementsByTagName('result')[0].firstChild.nodeValue;
			
			if (result != null)
			{
				resultList[result] += 1;
			}	
		}
	}

	return resultList;
}