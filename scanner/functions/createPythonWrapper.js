function createPythonWrapper(modulePath, className) {

    let wrapper;
    try {
        wrapper = new PythonWrapper(modulePath, className);
    } catch (e) {
        console.log(e);
        console.log('skipping: ' + modulePath + (className ? ':' + className : ''));
        return Promise.resolve(false);
    }
    let fname = wrapper.getOutputFilename();
    let pyPromise = fse.outputFile(fname, wrapper.output);

    // Also output documentation for the Python API
    let docfname = wrapper.getDocFilename();
    //console.log(docfname);
    //let docPromise = Promise.resolve();
    let docPromise = fse.outputFile(docfname, wrapper.getDocOutput());

    return Promise.all([pyPromise, docPromise]);
}