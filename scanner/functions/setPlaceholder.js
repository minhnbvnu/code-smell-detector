function setPlaceholder(cm) {
    clearPlaceholder(cm);
    var elt = cm.state.placeholder = document.createElement("pre");
    elt.style.cssText = "height: 0; overflow: visible";
    elt.style.direction = cm.getOption("direction");
    elt.className = "CodeMirror-placeholder CodeMirror-line-like";
    var placeHolder = cm.getOption("placeholder")
    if (typeof placeHolder == "string") placeHolder = document.createTextNode(placeHolder)
    elt.appendChild(placeHolder)
    cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
  }