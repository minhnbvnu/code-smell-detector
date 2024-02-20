function generateFiles() {

    return Promise.all([
        createJavascriptFiles(),
        createPythonFiles(),
    ]);

}