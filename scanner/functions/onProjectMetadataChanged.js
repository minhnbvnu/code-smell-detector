function onProjectMetadataChanged(projectLicense) {
    const t = document.getElementById('projectTitle').value.trim();
    const titleChanged = t !== gameSource.json.title;
    gameSource.json.title = t;

    const textFields = ['developer', 'copyright', 'license', 'description'];
    for (let f = 0; f < textFields.length; ++f) {
        const key = textFields[f];
        gameSource.json[key] = document.getElementById('project' + capitalize(key)).value.trim();
    }

    const boolFields = ['Cooperative', 'Competitive', 'High Scores', 'Achievements'];
    for (let f = 0; f < boolFields.length; ++f) {
        const name = boolFields[f];
        const key = name.replace(/ /g,'').toLowerCase();
        gameSource.json[key] = document.getElementById('project' + capitalize(key)).checked ? true : false;
    }

    const mn = parseInt(document.getElementById('projectMinPlayers').value);
    const mx = parseInt(document.getElementById('projectMaxPlayers').value);
    gameSource.json.min_players = Math.min(mn, mx);
    gameSource.json.max_players = Math.max(mn, mx);
    document.getElementById('projectMinPlayers').value = gameSource.json.min_players;
    document.getElementById('projectMaxPlayers').value = gameSource.json.max_players;

    gameSource.json.screenshot_tag = document.getElementById('screenshotTag').value;

    if (editableProject && gameSource.debug && gameSource.debug.json && gameSource.debug.json.screenshot_tag_enabled) {
        gameSource.debug.json.screenshot_tag = document.getElementById('debugScreenshotTag').value;
        console.log('saving debug');
        serverSaveDebugJSON();
    }
    
    serverSaveGameJSON(titleChanged ? function () { loadGameIntoIDE(window.gameURL, null, true); } : undefined);
}