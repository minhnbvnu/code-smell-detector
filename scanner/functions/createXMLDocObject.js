function createXMLDocObject(xmlString) {
	var xmlDoc = null;

	try //Internet Explorer
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xmlString);
	}
	catch(e)
	{
		try //Firefox, Mozilla, Opera, Chrome, etc.
		{
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(xmlString,"text/xml");
		}
		catch(e) {
			console.log("[Error occurred when creating a xml object from a string]%s", xmlString);
		}
	}

	return xmlDoc;
}