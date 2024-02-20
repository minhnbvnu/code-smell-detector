function onNewScriptCreate() {
    const text = document.getElementById('newScriptName');

    // Clean up
    let name = text.value.trim().replace(/[^A-Za-z0-9_\-+=]/g, '');
    if (name.length === 0) { return; }
    name += '.pyxl';

    // Make sure that the script doesn't already exist in this project
    for (let i = 0; i < gameSource.scripts.length; ++i) {
        if (gameSource.scripts[i].replace(/^.*\//, '') === name) {
            alert('A script named ' + name + ' already exists in this project.');
            return;
        }
    }

    // Name is OK, create the script
    // Canonicalize slashes and remove the game.json
    let gameFilename = gameSource.jsonURL.replace(/\\/g, '/');
    if (gameFilename.startsWith(location.origin)) {
        gameFilename = gameFilename.substring(location.origin.length);
    }
    console.assert(gameFilename.endsWith('.game.json'));

    // Add the new script
    gameSource.json.scripts.push(name);

    // Convert to a string
    const gameContents = WorkJSON.stringify(gameSource.json, undefined, 4);

    const scriptFilename = getGamePath() + name;

    // Write the file and then reload
    serverWriteFiles([{filename: scriptFilename, contents: '// Scripts, variables, and constants here are visible to all modes\n', encoding: 'utf8'},
                      {filename: gameFilename, contents: gameContents, encoding: 'utf8'}],
                     function () {
        loadGameIntoIDE(window.gameURL, function () {
            // Find the script in the new project and select it
            const url = gameSource.jsonURL.replace(/\/[^/]+\.game\.json$/, '\/') + name;
            const id = 'ScriptItem_' + url;
            onProjectSelect(document.getElementById(id), 'script', url);
        }, true)});
    
    hideNewScriptDialog();
}