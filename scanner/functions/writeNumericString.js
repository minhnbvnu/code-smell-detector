function writeNumericString(nStr, minValue) {
    var length = nStr.length;
    var mlength = minValue;
    if(length - minValue >= 0) {
        mlength = length - minValue;
    }
    
    var result = [];
    
    for(var i = 0; i < length; i += 2) {
        var c1 = nStr.charCodeAt(i);
    	var c2 = 0;
        if(i + 1 < length) {
            c2 = nStr.charCodeAt(i + 1);
        }
        else {
            c2 = 0x30;
        }
        c1 = (c1 - 0x30) % 10;
        c2 = (c2 - 0x30) % 10;
        
        result[result.length] = new type.UInt8((c1 << 4) | c2);
    }
    
    return new type.Component([writeLength(mlength), new type.Component(result)]);
}