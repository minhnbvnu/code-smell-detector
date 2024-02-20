function convertXMLDocToJSON(xmlDoc) {
    var jsonObj = {};  
   
    if (xmlDoc != null && typeof(xmlDoc) != "undefined") {
        /*
        ELEMENT TYPE    NODE TYPE
        element             1
        attr                2
        text                3
        comments            8
        document            9
        */
        if (xmlDoc.nodeType == 1) { // if the node is an element node  
            
            if (xmlDoc.attributes.length > 0) { // add attributes to the return json object         
                jsonObj["@attributes"] = {};  
                for (var i = 0; i < xmlDoc.attributes.length; i++) {  
                    var attribute = xmlDoc.attributes.item(i);  
                    jsonObj["@attributes"][attribute.nodeName] = attribute.nodeValue;  
                }  
            }  
        } else if (xmlDoc.nodeType == 3) { // if the node is a text node  
            jsonObj = xmlDoc.nodeValue;  
        }  
       
        if (xmlDoc.hasChildNodes()) {// if the node has child nodes, resolve them recursively  
            for(var i = 0; i < xmlDoc.childNodes.length; i++) {  
                var child = xmlDoc.childNodes.item(i);  
                var nodeName = child.nodeName;  
                
                if (typeof(jsonObj[nodeName]) == "undefined") {                      
                    jsonObj[nodeName] = convertXMLDocToJSON(child);  
                }else  {  
                    if (typeof(jsonObj[nodeName].length) == "undefined") { // convert the node to a list to contain more homonymic child nodes
                      
                        var oldNode = jsonObj[nodeName];  
                        jsonObj[nodeName] = [];  
                        jsonObj[nodeName].push(oldNode);  
                    }  
                    obj[nodeName].push(convertXMLDocToJSON(child));  
                }  
            }  
        } 
    }else {
        console.log("[Error occurred when convert a dom object to a json object] The dom object is null or its type is undefined.");
    }
    
    return jsonObj;  
}