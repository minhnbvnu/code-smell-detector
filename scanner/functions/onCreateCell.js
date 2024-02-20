function onCreateCell(element) {
    var textNode = document.createTextNode('');
    element.appendChild(textNode);
    
    var foldWidget = dom.createElement("span");
    element.appendChild(foldWidget);
    
    return element;
}