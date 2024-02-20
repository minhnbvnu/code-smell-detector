function hasBody(response, namesAndValuesList) {
    var request = getFieldValue(response, F_rsp_request)
    var m = getFieldValue(request, F_req_method);
    if (JavaStringWapper.$new("HEAD").equals(m)) {
        return false;
    }
    var Transfer_Encoding = "";
    var respHeaderSize = getHeaderSize(namesAndValuesList)
    for (var i = 0; i < respHeaderSize; i++) {
        if (JavaStringWapper.$new("Transfer-Encoding").equals(getHeaderName(namesAndValuesList, i))) {
            Transfer_Encoding = getHeaderValue(namesAndValuesList, i);
            break
        }
    }
    var code = getFieldValue(response, F_rsp_code)
    if (((code >= 100 && code < 200) || code == 204 || code == 304)
        && response[M_rspBody_contentLength] == -1
        && !JavaStringWapper.$new("chunked").equalsIgnoreCase(Transfer_Encoding)
    ) {
        return false;
    }
    return true;
}