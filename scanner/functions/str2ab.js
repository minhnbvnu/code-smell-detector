function str2ab(str){
    var buf = new ArrayBuffer(str.length*2);
    bufView = new Uint16Array(buf);
    for(var i=0; i<str.length; i++){
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}