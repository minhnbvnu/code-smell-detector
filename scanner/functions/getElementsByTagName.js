function getElementsByTagName(element, localName) {
    const result = element.getElementsByTagName(localName);
    if (result && result.length) {
        return result;
    }
    const name = ns + ':' + localName;
    return element.getElementsByTagName(name);
}