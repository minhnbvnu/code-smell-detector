function onNewModeCreate() {
    const text = document.getElementById('newModeName');

    // Clean up
    let name = text.value.trim().replace(/[^A-Za-z0-9_]/g, '');
    if (name.length === 0) { return; }

    // Capitalize
    name = name[0].toUpperCase() + name.substring(1);
    if (! /[A-Z]/.test(name[0])) {
        alert('The mode name must begin with a capital letter');
        return;
    }

    // Make sure that the mode doesn't already exist in this project
    for (let i = 0; i < gameSource.modes.length; ++i) {
        if (gameSource.modes[i].name.replace(/\*/g, '') === name) {
            alert('A mode named ' + name + ' already exists in this project.');
            return;
        }
    }

    // Name is OK, create the mode
    const modeContents = `${name}
════════════════════════════════════════════════════════════════════════
// Put local state for the mode here.  Declare variables with let,
// constants with const, and functions with def.


enter
────────────────────────────────────────────────────────────────────────
// This event runs when the mode is entered via set_mode() or
//  push_mode().


frame
────────────────────────────────────────────────────────────────────────
// This event runs 60 times per second. Game logic, simulation,
// user input, and drawing all go here.


leave
────────────────────────────────────────────────────────────────────────
// This event runs just before leaving for another mode by
// set_mode() or pop_mode().

`;
    // Tell the server

    // Canonicalize slashes and remove the game.json
    let gamePath = gameSource.jsonURL.replace(/\\/g, '/');
    if (gamePath.startsWith(location.origin)) {
        gamePath = gamePath.substring(location.origin.length);
    }

    const gameFilename = gamePath;
    console.assert(gameFilename.endsWith('.game.json'));

    const gameJSON = gameSource.json;

    // Add the new mode
    gameJSON.modes.push(name);

    // Convert to a string
    const gameContents = WorkJSON.stringify(gameJSON, undefined, 4);

    let modeFilename = gamePath.replace(/\/[^/]+\.game\.json$/, '\/');
    if (! modeFilename.endsWith('/')) { modeFilename += '/'; }
    
    modeFilename += name + '.pyxl';

    // Write the file and then reload
    serverWriteFiles([{filename: modeFilename, contents: modeContents, encoding: 'utf8'},
                      {filename: gameFilename, contents: gameContents, encoding: 'utf8'}],
                     function () {
        loadGameIntoIDE(window.gameURL, function () {
            // Find the mode in the new project and select it
            let mode;
            for (let i = 0; i < gameSource.modes.length; ++i) {
                if (gameSource.modes[i].name === name) { mode = gameSource.modes[i]; break; }
            }
            
            if (mode) {
                onProjectSelect(document.getElementById('ModeItem_' + name), 'mode', mode);
            } else {
                console.log('ERROR: could not find the mode that was just added');
            }
        })})
    
    hideNewModeDialog();
}