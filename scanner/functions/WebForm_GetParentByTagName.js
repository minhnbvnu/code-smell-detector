function WebForm_GetParentByTagName(element, tagName) {
    var parent = element.parentNode;
    var upperTagName = tagName.toUpperCase();
    while (parent && (parent.tagName.toUpperCase() != upperTagName)) {
        parent = parent.parentNode ? parent.parentNode : parent.parentElement;
    }
    return parent;
}