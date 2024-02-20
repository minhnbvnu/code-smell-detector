function base64ToBuf(b64) {
        var binStr = atob(b64);
        var len = binStr.length;
        var arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }
        return arr;
    }