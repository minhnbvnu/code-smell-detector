function WebForm_IsInVisibleContainer(ctrl) {
    var current = ctrl;
    while((typeof(current) != "undefined") && (current != null)) {
        if (current.disabled ||
            ( typeof(current.style) != "undefined" &&
            ( ( typeof(current.style.display) != "undefined" &&
                current.style.display == "none") ||
                ( typeof(current.style.visibility) != "undefined" &&
                current.style.visibility == "hidden") ) ) ) {
            return false;
        }
        if (typeof(current.parentNode) != "undefined" &&
                current.parentNode != null &&
                current.parentNode != current &&
                current.parentNode.tagName.toLowerCase() != "body") {
            current = current.parentNode;
        }
        else {
            return true;
        }
    }
    return true;
}