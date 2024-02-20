function getAttributeValue(suffix, element) {
    var attribute = 'data-clipboard-' + suffix;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}