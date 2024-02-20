function GetValueByKey(xmlStr, key)
{
    if(window.DOMParser)
    {
        var parser = new window.DOMParser();
        try
        {
            var xmlDoc = parser.parseFromString(xmlStr, "text/xml");
            var node = xmlDoc.getElementsByTagName(key)[0];
            if(node && node.childNodes[0])
            {
                return node.childNodes[0].nodeValue;
            }
        }
        catch(e)
        {
            //log the error
        }
    }
    return "";
}