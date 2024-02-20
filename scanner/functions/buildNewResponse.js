function buildNewResponse(responseObject) {
    var newResponse = null;
    Java.perform(function () {
        try {
            var logString = JavaStringBufferWapper.$new()

            logString.append("").append("\n");
            logString.append("┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────").append("\n");

            newResponse = printAll(responseObject, logString)

            logString.append("└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────").append("\n");
            logString.append("").append("\n");

            console.log(logString)
        } catch (error) {
            console.log("printAll ERROR : " + error);
        }
    })
    return newResponse;
}