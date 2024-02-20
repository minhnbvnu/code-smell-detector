function requestErrorSteps(xhr) {
        clearResponse(xhr);
        xhr.errorFlag = true;
        xhr.requestHeaders = {};
        xhr.responseHeaders = {};

        if (
            xhr.readyState !== FakeXMLHttpRequest.UNSENT &&
            xhr.sendFlag &&
            xhr.readyState !== FakeXMLHttpRequest.DONE
        ) {
            xhr.readyStateChange(FakeXMLHttpRequest.DONE);
            xhr.sendFlag = false;
        }
    }