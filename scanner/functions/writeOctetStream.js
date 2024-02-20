function writeOctetStream(oStr, minValue) {
	minValue = minValue || 0;
    var length = oStr.length;
    var mlength = minValue;
    
    if(length - minValue >= 0) {
        mlength = length - minValue;
    }
    
    result = [];
    for(var i = 0; i < length; i++) {
        result[result.length] = new type.UInt8(oStr[i]);
    }
    
    return new type.Component([writeLength(mlength), new type.Component(result)]);
}