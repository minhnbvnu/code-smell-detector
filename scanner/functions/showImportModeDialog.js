function showImportModeDialog() {
    document.getElementById('importModeDialog').classList.remove('hidden');
    let gamePath = getGamePath();
    const codeListURL = location.origin + getQuadPath() + 'console/_scripts.json?gamePath=' + gamePath;
    document.getElementById('importModeImportButton').disabled = true;
    
    // Fetch the mode list
    LoadManager.fetchOne({forceReload: true}, codeListURL, 'json', null, function (json) {
        // Strip the path to the current game off scripts in the same dir
        // or subdirectory of it. We do not do this on the server side
        // because we may later allow developers to have their own asset directories
        // separate from games, and the existing protocol allows that.
        if (gamePath.length > 0 && gamePath[0] === '/') {
            gamePath = gamePath.substring(1);
        }

        for (let i = 0; i < json.length; ++i) {
            const url = json[i];
            if (url.startsWith(gamePath)) {
                json[i] = url.substring(gamePath.length);
            }

            // Remove scripts
            if (! /(^|\/)[A-Z][^\/]*$/.test(json[i])) {
                json.splice(i, 1);
                --i;
            }
        }
        
        // Create the initial display
        let s = '<ol id="importModeListOL" class="select-list">\n';
        for (let i = 0; i < json.length; ++i) {
            const file = json[i];

            // Disable if already in the project
            const disable = (gameSource.json.modes.indexOf(file) !== -1);
            
            const path = (file.indexOf('/') === -1) ? '' : file.replace(/\/[^\/]+$/, '/');
            const rest = file.replace(/^.*\//, '');
            const base = rest.replace(/\..+?$/, '');
            const ext  = rest.replace(/^[^\.]+/, '');
            s += `<li ${disable ? '' : 'onclick="onImportModeListSelect(this)"'}>${path}<b style="color:#000">${base}</b></li>\n`;
        }
        s += '</ol>';

        document.getElementById('importModeList').innerHTML = s;
    });

}