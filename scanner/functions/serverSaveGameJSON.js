function serverSaveGameJSON(callback) {
    console.assert(gameSource.jsonURL);
    const webpath = urlToLocalWebPath(gameSource.jsonURL);
    console.assert(webpath.endsWith('.game.json'));
 
    const gameContents = WorkJSON.stringify(gameSource.json, undefined, 4);

    // Update the text version used for the IDE
    fileContents[gameSource.jsonURL] = gameContents;

    // Update the editor if open
    if (codeEditorSessionMap.get(gameSource.jsonURL)) {
        updateCodeEditorSession(gameSource.jsonURL, gameContents);
    }
    
    serverWriteFile(webpath, 'utf8', gameContents, callback);
}