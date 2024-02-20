function bodyEncoded(namesAndValuesList) {
    if (null == namesAndValuesList) return false;
    var contentEncoding = getByHeader(namesAndValuesList, "Content-Encoding")
    var bodyEncoded = contentEncoding != null && !JavaStringWapper.$new("identity").equalsIgnoreCase(contentEncoding)
    return bodyEncoded

}