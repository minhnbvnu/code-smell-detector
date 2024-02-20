function parseTranscodeStatus(xmlDoc)
{
    var result = "";
    
	if (xmlDoc != null)
	{
        result = xmlDoc.getElementsByTagName('result')[0].firstChild.nodeValue;
        var ret_taskID = xmlDoc.getElementsByTagName('taskID')[0].attributes['ID'].value;
        
        if (ret_taskID == taskID)
        {                        
            if (result != null)
            {
                return result;
            }
             else
            {
                result = 'Error';
            }
        }

	}

	return result;
}