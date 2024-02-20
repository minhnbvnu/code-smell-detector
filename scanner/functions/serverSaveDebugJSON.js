function serverSaveDebugJSON(callback) {
    console.assert(gameSource.jsonURL);
    const debugFilename = urlToLocalWebPath(gameSource.jsonURL).replace(/\.game\.json$/, '.debug.json');
 
    const debugContents = WorkJSON.stringify(gameSource.debug.json || {}, undefined, 4);
    serverWriteFile(debugFilename, 'utf8', debugContents, callback);
}