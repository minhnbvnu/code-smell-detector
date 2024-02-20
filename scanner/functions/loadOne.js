function loadOne(filepath, connectors){
    try{
        var candidate = require(filepath);
        var connectorName = candidate.connectorName;
        if(connectorName){
            connectors[connectorName] = filepath
        }
    }catch(e){}

}