function printerRequest(request, logString) {
    var defChatset = CharsetWapper.forName("UTF-8")
    //URL
    var httpUrl = getFieldValue(request, F_req_url)
    logString.append("| URL: " + httpUrl).append("\n")
    logString.append("|").append("\n")
    logString.append("| Method: " + getFieldValue(request, F_req_method)).append("\n")
    logString.append("|").append("\n")
    var requestBody = getFieldValue(request, F_req_body);
    var hasRequestBody = true
    if (null == requestBody) {
        hasRequestBody = false
    }
    //Headers
    var requestHeaders = getFieldValue(request, F_req_headers)
    var headersList = headersToList(requestHeaders)
    var headersSize = getHeaderSize(headersList)

    logString.append("| Request Headers: ").append("" + headersSize).append("\n")
    if (hasRequestBody) {
        var requestBody = getWrapper(requestBody)
        var contentType = requestBody[M_reqbody_contentType]()
        if (null != contentType) {
            logString.append("|   ┌─" + "Content-Type: " + contentType).append("\n")
        }
        var contentLength = requestBody[M_reqbody_contentLength]()
        if (contentLength != -1) {
            var tag = headersSize == 0 ? "└─" : "┌─"
            logString.append("|   " + tag + "Content-Length: " + contentLength).append("\n")
        }
    }
    if (headersSize == 0) {
        logString.append("|     no headers").append("\n")
    }
    for (var i = 0; i < headersSize; i++) {
        var name = getHeaderName(headersList, i)
        if (!JavaStringWapper.$new("Content-Type").equalsIgnoreCase(name) && !JavaStringWapper.$new("Content-Length").equalsIgnoreCase(name)) {
            var value = getHeaderValue(headersList, i)
            var tag = i == (headersSize - 1) ? "└─" : "┌─"
            logString.append("|   " + tag + name + ": " + value).append("\n")
        }
    }
    var shielded = filterUrl(httpUrl.toString())
    if (shielded) {
        logString.append("|" + "     File Request Body Omit.....").append("\n")
        return;
    }
    logString.append("|").append("\n")
    if (!hasRequestBody) {
        logString.append("|" + "--> END ").append("\n")
    } else if (bodyEncoded(headersList)) {
        logString.append("|" + "--> END  (encoded body omitted > bodyEncoded)").append("\n")
    } else {
        logString.append("| Request Body:").append("\n")
        var buffer = BufferWapper.$new()
        requestBody[M_reqbody_writeTo](buffer)
        var reqByteString = getByteString(buffer)

        var charset = defChatset
        var contentType = requestBody[M_reqbody_contentType]()
        if (null != contentType) {
            var appcharset = contentType[M_contentType_charset](defChatset);
            if (null != appcharset) {
                charset = appcharset;
            }
        }
        //LOG Request Body
        try {
            if (isPlaintext(reqByteString)) {
                logString.append(splitLine(readBufferString(reqByteString, charset), "|   ")).append("\n")
                logString.append("|").append("\n")
                logString.append("|" + "--> END ").append("\n")
            } else {
                logString.append(splitLine(hexToUtf8(reqByteString.hex()), "|   ")).append("\n")
                logString.append("|").append("\n");
                logString.append("|" + "--> END  (binary body omitted -> isPlaintext)").append("\n")
            }
        } catch (error) {
            logString.append(splitLine(hexToUtf8(reqByteString.hex()), "|   ")).append("\n")
            logString.append("|").append("\n");
            logString.append("|" + "--> END  (binary body omitted -> isPlaintext)").append("\n")
        }
    }
    logString.append("|").append("\n");
}