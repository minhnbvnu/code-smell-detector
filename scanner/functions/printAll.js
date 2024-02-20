function printAll(responseObject, logString) {
    try {
        var request = getFieldValue(responseObject, F_rsp_request)
        printerRequest(request, logString)
    } catch (error) {
        console.log("print request error : ", error.stack)
        return responseObject;
    }
    var newResponse = printerResponse(responseObject, logString)
    return newResponse;
}