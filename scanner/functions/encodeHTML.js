function encodeHTML(htmlString) {
    var converter = document.createElement("div");
    var text = document.createTextNode(htmlString);
    converter.appendChild(text);
    return converter.innerHTML;    
}