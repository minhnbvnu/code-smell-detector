function createJavascriptWrapper(modulePath, className) {

    let wrapper;
    try {
        wrapper = new JavascriptWrapper(modulePath, className);
    } catch (e) {
        console.log('error creating wrapper: ');
        console.log(e);
        console.log('skipping: ' + modulePath + (className ? ':' + className : ''));
        return Promise.resolve(false);
    }
    return fse.outputFile(wrapper.getOutputFilename(), wrapper.output);

    // NOTE: Old implementation
    // const wrapper = new JavascriptWrapper(modulePath);
    // return wrapper.writeOutFile();

}