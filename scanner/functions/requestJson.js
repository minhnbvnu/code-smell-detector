function requestJson(method, url, params, successCallback, failureCallback) {
        method = method.toUpperCase();
        var body = null;
        if (method === 'GET') {
            url = injectQueryStringParams(url, params);
        }
        else {
            body = encodeParams(params);
        }
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (method !== 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                try {
                    var res = JSON.parse(xhr.responseText);
                    successCallback(res, xhr);
                }
                catch (err) {
                    failureCallback('Failure parsing JSON', xhr);
                }
            }
            else {
                failureCallback('Request failed', xhr);
            }
        };
        xhr.onerror = function () {
            failureCallback('Request failed', xhr);
        };
        xhr.send(body);
    }