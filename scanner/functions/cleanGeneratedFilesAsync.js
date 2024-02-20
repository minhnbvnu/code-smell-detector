function cleanGeneratedFilesAsync() {
    // trailing slash will match only directories
    var jsPromise = rmFileGlobAsync('./**/*.autogen.js');
    var jsonPromise = rmFileGlobAsync('./**/*.autogen.json');
    var jsIndexPromise = rmFileGlobAsync('./**/index.js');

    var pyPromise = rmFileGlobAsync('../pythreejs/**/*_autogen.py');
    var pyIndexPromise = rmFileGlobAsync('../pythreejs/**/__init__.py');

    var docPromise = rmFileGlobAsync('../docs/source/**/*_autogen.rst');
    var docIndexPromise = rmFileGlobAsync('../docs/source/api/**/index.rst');

    return Promise.all([
        jsPromise,
        jsonPromise,
        jsIndexPromise,
        pyPromise,
        pyIndexPromise,
        docPromise,
        docIndexPromise,
    ]);
}