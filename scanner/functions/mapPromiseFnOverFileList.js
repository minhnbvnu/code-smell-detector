function mapPromiseFnOverFileList(fileList, mapFn) {
    let promises = [];

    fileList.forEach(function(filePath) {
        const result = mapFn(filePath);
        if (result instanceof Array) {
            promises = promises.concat(result);
        } else {
            promises.push(result);
        }
    }, this);

    return Promise.all(promises);
}