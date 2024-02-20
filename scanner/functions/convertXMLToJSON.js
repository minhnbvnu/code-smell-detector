function convertXMLToJSON(xmlString) {
    var jsonObj = {};
    
    var xmlDoc = null;
    xmlDoc = createXMLDocObject(xmlString)
    
    if (xmlDoc != null) {
        jsonObj = convertXMLDocToJSON(xmlDoc);
    }else{
        console.log("[Error occurred when convert a xml string to json]%s", xmlString);
    }
    
    return jsonObj;
}