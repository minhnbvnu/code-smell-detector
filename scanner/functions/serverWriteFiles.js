function serverWriteFiles(array, callback, errorCallback) {
    let complete = 0;
    function onSuccess() {
        ++complete;
        if (complete >= array.length && callback) { callback(); }
    }

    for (let i = 0; i < array.length; ++i) {
        serverWriteFile(array[i].filename, array[i].encoding, array[i].contents, onSuccess, errorCallback);
    }
}