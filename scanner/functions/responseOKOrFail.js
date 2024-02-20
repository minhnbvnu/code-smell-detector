function responseOKOrFail(errorString) {
    return function (r) {
        if (r.ok) {
            console.log('attack frame ', window.location.hostname, ' received a response');
            return r.text()
        } else {
            throw new Error(errorString)
        }
    }
}