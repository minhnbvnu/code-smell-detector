function serverDeleteFile(url, callback, errorCallback) {
    console.assert(locallyHosted());

    console.log('Deleting', url);
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            // Request finished. Do processing here.
            const jsonResponse = /^[ \t\n]*$/.test(xhr.response) ? undefined : WorkJSON.parse(xhr.response);
            if ((this.status >= 200) && (this.status <= 299)) {
                if (callback) {
                    // Give the server a little more time to catch up
                    // if it is writing to disk and needs to flush or
                    // such before invoking the callback.
                    setTimeout(function () { callback(jsonResponse, this.status); }, 150);
                }
            } else if (errorCallback) {
                errorCallback(jsonResponse, this.status);
            }
        }
    }
    
    xhr.send(JSON.stringify({token: postToken}));
}