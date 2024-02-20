function showModeContextMenu(mode) {
    const id = 'ModeItem_' + mode.name;

    let s = `<div onmousedown="onProjectSelect(document.getElementById('${id}'}), 'mode', gameSource.modes[${gameSource.modes.indexOf(mode)}])">Edit</div>`;
    if (mode.name !== gameSource.json.start_mode) {
        s += `<div onmousedown="onProjectInitialModeChange('${mode.name}')">Set As Start Mode</div>`
    }
    
    const builtIn = isBuiltIn(makeURLRelativeToGame(mode.name + '.pyxl'));
    if (! builtIn) {
        s += `<div onmousedown="onRenameMode('${mode.name}')">Rename&hellip;</div>`
    }

    s += `<hr><div onmousedown="onRemoveMode('${mode.name}')"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&times;</span>Remove ${mode.name}</div>`

    customContextMenu.innerHTML = s;
    showContextMenu('project');
}