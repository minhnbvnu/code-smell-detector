function decodeHTML(encodeString) {
    var converter = document.createElement("div");
    converter.innerHTML = encodeString;
    return converter.innerHTML;   
}