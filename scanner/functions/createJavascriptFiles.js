function createJavascriptFiles() {
    return mapPromiseFnOverThreeModules(createJavascriptWrapper)
        .then(function() {
            return mapPromiseFnOverFileList(CUSTOM_CLASSES, createJavascriptWrapper);
        })
        .then(function() {
            return writeJavascriptIndexFiles();
        });
}