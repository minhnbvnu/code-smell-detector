function postToServer(payload, callback, errorCallback) {
    console.assert(locallyHosted());

    payload.token = postToken;

    const serverAddress = location.href.replace(/(^http.?:\/\/[^/]+\/).*/, '$1');
                          
    const xhr = new XMLHttpRequest();
    xhr.open('POST', serverAddress, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            // Request finished. Do callback processing here.
            const fcn = ((this.status >= 200) && (this.status <= 299)) ?
                  callback :
                  errorCallback;

            //console.log(this.status);

            // Run the callback if there is one. On Windows, there can
            // be race conditions for filesystem writes, so we delay
            // the callback 25ms everywhere (maybe that will
            // occur on other platforms)
            if (fcn) {
                const json = WorkJSON.parse(xhr.response);
                const status = this.status;
                setTimeout(fcn, 25, json, status);
            }
        }
    }
    
    xhr.send(JSON.stringify(payload));
}