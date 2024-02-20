function arrayToString(arr, encoder, maxLength) {
        var buffer = new Buffer(maxLength);
        var joiner = "";

        var i = 0, cnt = arr.length;
        for (i=0; i<cnt; i++) {
            if (arr[i] !== null && arr[i] !== undefined) {
                buffer.append(joiner).append(arr[i], encoder);
                joiner = ",";
            }
        }
        return buffer.str;
    }