function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open('GET', url, true);
        http.responseType = 'blob';
        http.onload = function (e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }