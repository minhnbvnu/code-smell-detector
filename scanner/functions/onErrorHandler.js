function onErrorHandler(errorMsg, url, lineNumber, columnNumber, errorObj) {
    try {
        let location = simplifySrcUrls(
            ((errorObj instanceof Object)? errorObj.stack : undefined) ||
                (url + ":" + lineNumber + ":" + columnNumber));

        let body = [
            'URL',
            document.location,
            '',
            'BROWSER',
            window.navigator.userAgent,
            window.navigator.appName,
            window.navigator.appVersion,
            '',
            'ERROR OBJECT',
            errorObj instanceof Object && errorObj.toString !== undefined ? errorObj.toString() : String(errorObj),
            '',
            'ERROR LOCATION',
            simplifySrcUrls(location)
        ].join('\n');

        showErrorDiv(
            'An error happened. :(',
            errorMsg,
            body,
            "(Unexpected) " + errorMsg + " @ " + location.substr(0, 200) + "[...]");

        drawErrorBox([
            'An error is happening. :(',
            '',
            errorMsg,
            '',
            'Scroll down for more information'
        ].join('\n'));

    } catch (ex) {
        console.error("Caused an exception when handling unexpected error.", ex);
    }
    return false;
}