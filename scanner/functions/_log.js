function _log() {
    if(!sjs.debug)
        return;
    var result = "";
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i] + ' ';
    }
    output(result + "\r\n");
}