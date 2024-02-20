function showImportDocDialog() {
    document.getElementById('importDocDialog').classList.remove('hidden');
    let gamePath = getGamePath();
    const docListURL = location.origin + getQuadPath() + 'console/_docs.json?gamePath=' + gamePath;
    document.getElementById('importDocImportButton').disabled = true;
    
    // Fetch the doc list
    LoadManager.fetchOne({forceReload: true}, docListURL, 'json', null, function (json) {
        // Strip the path to the current game off docs in the same dir
        // or subdirectory of it.

        // TODO: This looks wrong
        if (gamePath.length > 0 && gamePath[0] === '/') {
            gamePath = gamePath.substring(1);
        }

        for (let i = 0; i < json.length; ++i) {
            const url = json[i];
            if (url.startsWith(gamePath)) {
                json[i] = url.substring(gamePath.length);
            }
        }
        
        // Create the display
        let s = '<ol id="importDocListOL" class="select-list">\n';
        for (let i = 0; i < json.length; ++i) {
            const file = json[i];

            // Disable if already in the project
            const disable = (gameSource.json.docs.indexOf(file) !== -1);
            
            const path = (file.indexOf('/') === -1) ? '' : file.replace(/\/[^\/]+$/, '/');
            const rest = file.replace(/^.*\//, '');
            const base = rest.replace(/\..+?$/, '');
            const ext  = rest.replace(/^[^\.]+/, '');
            s += `<li ${disable ? '' : 'onclick="onImportDocListSelect(this)"'}>${path}<b style="color:#000">${base}</b>${ext}</li>\n`;
        }
        s += '</ol>';

        document.getElementById('importDocList').innerHTML = s;
    });
}