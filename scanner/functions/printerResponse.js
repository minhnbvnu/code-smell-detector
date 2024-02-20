function printerResponse(response, logString) {
    var newResponse = null;
    try {
        var defChatset = CharsetWapper.forName("UTF-8")

        var request = getFieldValue(response, F_rsp_request)
        var url = getFieldValue(request, F_req_url)
        var shielded = filterUrl(url.toString())
        if (shielded) {
            logString.append("|" + "     File Response Body Omit.....").append("\n")
            return response;
        }
        //URL
        logString.append("| URL: " + url).append("\n")
        logString.append("|").append("\n")
        logString.append("| Status Code: " + getFieldValue(response, F_rsp_code) + " / " + getFieldValue(response, F_rsp_message)).append("\n")
        logString.append("|").append("\n")
        var responseBodyObj = getFieldValue(response, F_rsp_body)
        var responseBody = getWrapper(responseBodyObj)
        var contentLength = responseBody[M_rspBody_contentLength]()
        //Headers
        var resp_headers = getFieldValue(response, F_rsp_headers)
        var respHeadersList = headersToList(resp_headers)
        var respHeaderSize = getHeaderSize(respHeadersList)
        logString.append("| Response Headers: ").append("" + respHeaderSize).append("\n")
        if (respHeaderSize == 0) {
            logString.append("|     no headers").append("\n")
        }
        for (var i = 0; i < respHeaderSize; i++) {
            var tag = i == (respHeaderSize - 1) ? "└─" : "┌─"
            logString.append("|   " + tag + getHeaderName(respHeadersList, i) + ": " + getHeaderValue(respHeadersList, i)).append("\n")
        }
        //Body
        var content = "";
        var nobody = !hasBody(response, respHeadersList)
        if (nobody) {
            logString.append("| No Response Body : " + response).append("\n")
            logString.append("|" + "<-- END HTTP").append("\n")
        } else if (bodyEncoded(respHeadersList)) {
            logString.append("|" + "<-- END HTTP (encoded body omitted)").append("\n")
        } else {
            logString.append("| ").append("\n");
            logString.append("| Response Body:").append("\n")
            var source = responseBody[M_rspBody_source]()
            var rspByteString = getByteString(source)
            var charset = defChatset
            var contentType = responseBody[M_rspBody_contentType]()
            if (null != contentType) {
                var appcharset = contentType[M_contentType_charset](defChatset)
                if (null != appcharset) {
                    charset = appcharset
                }
            }
            //newResponse
            var mediaType = responseBody[M_rspBody_contentType]()
            var newBody = null;
            try {
                newBody = ResponseBodyWapper[M_rspBody_create](mediaType, rspByteString.toByteArray())
            } catch (error) {
                newBody = ResponseBodyWapper[M_rspBody_create](mediaType, readBufferString(rspByteString, charset))
            }
            var newBuilder = null;
            if ("" == M_rsp_newBuilder) {
                var ResponseBuilderClazz = response.class.getDeclaredClasses()[0]
                newBuilder = Java.use(ResponseBuilderClazz.getName()).$new(response)
            } else {
                newBuilder = response[M_rsp_newBuilder]()
            }
            var bodyField = newBuilder.class.getDeclaredField(F_rsp$builder_body)
            bodyField.setAccessible(true)
            bodyField.set(newBuilder, newBody)
            newResponse = newBuilder[M_rsp$builder_build]()

            if (!isPlaintext(rspByteString)) {
                logString.append("|" + "<-- END HTTP (binary body omitted)").append("\n");
            }
            if (contentLength != 0) {
                try {
                    var content = readBufferString(rspByteString, charset)
                    logString.append(splitLine(content, "|   ")).append("\n")
                } catch (error) {
                    logString.append(splitLine(hexToUtf8(rspByteString.hex()), "|   ")).append("\n")
                }

                logString.append("| ").append("\n");
            }
            logString.append("|" + "<-- END HTTP").append("\n");
        }
    } catch (error) {
        logString.append("print response error : " + error).append("\n")
        if (null == newResponse) {
            return response;
        }
    }
    return newResponse;
}