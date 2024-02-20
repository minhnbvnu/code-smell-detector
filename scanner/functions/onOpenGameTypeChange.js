function onOpenGameTypeChange() {
    const t = document.getElementById('openGameType').value;
    let s = '<ol id="openGameListOL" class="select-list" style="font-family: Helvetica, Arial; font-size: 120%; white-space: normal">\n';
    if (openGameFiles) {
        const fileArray = openGameFiles[t];
        for (let i = 0; i < fileArray.length; ++i) {
            const game = fileArray[i];

            // Replace quad:// with a proper URL for HTML
            let label_path = game.url.replace('quad://', location.origin + getQuadPath());

            // Remove the game.json file
            label_path = label_path.replace(/\/[^/]+\.game.json$/, '/');
            label_path += 'label64.png';
            
            s += `<li ondblclick="onOpenGameOpen()" onclick="onOpenGameListSelect(this, '${game.url}')" class="unselectable" title="${game.url}">
<table><tr><td><img src="${label_path}" width=48 height=48 style="margin-right: 10px"></td><td>${game.title}<br/><span style="font-size:70%; font-style:italic">${game.description}</span></td></tr></table></li>\n`;
        }
    }
    s += '</ol>';

    const list = document.getElementById('openGameList');
    list.innerHTML = s;

    openGameFiles.selected = null;

    onOpenGameFilterChange();
    
    // Recreating the list destroys any selection
    document.getElementById('openGameOpenButton').disabled = true;
}