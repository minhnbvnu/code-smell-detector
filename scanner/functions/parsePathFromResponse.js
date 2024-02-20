function parsePathFromResponse(xmlDoc)
{
    var filePath = "";
	if (xmlDoc.getElementsByTagName('filePath').length > 0)
    {
	   filePath = xmlDoc.getElementsByTagName('filePath')[0].attributes['path'].value;
    }
    
    return filePath;
}