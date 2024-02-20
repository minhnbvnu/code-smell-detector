function createProjectWindow(gameSource) {
    let s = '';
    {
        const badge = isBuiltIn(gameSource.jsonURL) ? 'builtin' : (isRemote(gameSource.jsonURL) ? 'remote' : '');
        s += `<b title="${gameSource.extendedJSON.title} (${gameSource.jsonURL})" onclick="onProjectSelect(event.target, 'game', null)" class="clickable projectTitle ${badge}">${gameSource.extendedJSON.title}</b>`;
    }
    s += '<div style="border-left: 1px solid #ccc; margin-left: 4px; padding-top: 5px; padding-bottom: 9px; margin-bottom: -7px"><div style="margin:0; margin-left: -2px; padding:0">';

    s += '— <i>Scripts</i>\n';
    s += '<ul class="scripts">';
    for (let i = 0; i < gameSource.scripts.length; ++i) {
        const script = gameSource.scripts[i];
        if (! /\/console\/(os|launcher)\/_[A-Za-z0-9_]+\.pyxl$/.test(script)) {
            const badge = isBuiltIn(script) ? 'builtin' : (isRemote(script) ? 'remote' : '');
            const contextMenu = editableProject ? `oncontextmenu="showScriptContextMenu('${script}')" ` : '';
            s += `<li class="clickable ${badge}" ${contextMenu} onclick="onProjectSelect(event.target, 'script', '${script}')" title="${script}" id="ScriptItem_${script}">${urlFilename(script)}</li>\n`;
        }
    }
    if (editableProject) {
        s += '<li class="clickable import" onclick="showImportScriptDialog()"><i>Import existing script…</i></li>';
        s += '<li class="clickable new" onclick="showNewScriptDialog()"><i>Create new script…</i></li>';
    }
    s += '</ul>';
    
    s += '— <i class="clickable" onclick="onProjectSelect(event.target, \'mode\', undefined)" title="View mode diagram">Modes</i>\n';
    s += '<ul class="modes">';
    for (let i = 0; i < gameSource.modes.length; ++i) {
        const mode = gameSource.modes[i];
        // Hide system modes
        if (/^.*\/_|^_|^\$/.test(mode.name)) { continue; }
        const badge = isBuiltIn(mode.url) ? 'builtin' : (isRemote(mode.url) ? 'remote' : '');
        const contextMenu = editableProject ? `oncontextmenu="showModeContextMenu(gameSource.modes[${i}])"` : '';
        s += `<li ${contextMenu} class="clickable ${badge}" onclick="onProjectSelect(event.target, 'mode', gameSource.modes[${i}])" title="${mode.url}" id="ModeItem_${mode.name}"><code>${mode.name}${mode.name === gameSource.json.start_mode ? '*' : ''}</code></li>\n`;
    }
    if (editableProject) {
        s += '<li class="clickable import" onclick="showImportModeDialog()"><i>Import existing mode…</i></li>';
        s += '<li class="clickable new" onclick="showNewModeDialog()"><i>Create new mode…</i></li>';
    }
    s += '</ul>';

    s += '— <i>Docs</i>\n';
    s += '<ul class="docs">';
    {
        for (let i = 0; i < gameSource.docs.length; ++i) {
            const doc = gameSource.docs[i];
            const badge = isBuiltIn(doc) ? 'builtin' : (isRemote(doc) ? 'remote' : '');
            const contextMenu = editableProject ? `oncontextmenu="showDocContextMenu('${doc}')" ` : '';
            s += `<li class="clickable ${badge}" ${contextMenu} id="DocItem_${doc}" onclick="onProjectSelect(event.target, 'doc', '${doc}')" title="${doc}"><code>${doc.replace(/^.*\//, '')}</code></li>\n`;
        }
    }
    if (editableProject) {
        s += '<li class="clickable import" onclick="showImportDocDialog()"><i>Import existing doc…</i></li>';
        s += '<li class="clickable new" onclick="showNewDocDialog()"><i>Create new doc…</i></li>';
    }
    s += '</ul>';
    
    s += '— <i class="clickable" onclick="onProjectSelect(event.target, \'constant\', undefined)" title="View all constants">Constants</i>\n';
    s += '<ul class="constants">';
    {
        const keys = Object.keys(gameSource.extendedJSON.constants || {});
        keys.sort();
        const badge = isBuiltIn(gameSource.jsonURL) ? 'builtin' : (isRemote(gameSource.jsonURL) ? 'remote' : '');
        for (let i = 0; i < keys.length; ++i) {
            const c = keys[i];
            const v = gameSource.constants[c];
            const json = gameSource.extendedJSON.constants[c];
            let tooltip = (json.description || '').replace(/"/g, '\\"');
            if (tooltip.length > 0) { tooltip = ': ' + tooltip; }
            
            const cssclass =
                  (v === undefined || v === null) ? 'nil' :
                  (json.type === 'table') ? 'table' :
                  (json.type === 'xy' || json.type === 'xz') ? 'vec2D' :
                  (json.type === 'xyz') ? 'vec3D' :
                  (json.type === 'rgba' || json.type === 'rgb' || json.type === 'hsva' || json.type === 'hsv') ? 'color' :
                  (json.type === 'reference') ? 'reference' :
                  (json.type === 'distribution') ? 'distribution' :
                  Array.isArray(v) ? 'array' :
                  (typeof v);

            const contextMenu = editableProject ? `oncontextmenu="showConstantContextMenu('${c}')"` : '';

            // Add and then pad with enough space to extend into the hidden scrollbar area
            s += `<li ${contextMenu} class="clickable ${badge} ${cssclass}" title="${c}${tooltip}" id="projectConstant_${c}" onclick="onProjectSelect(event.target, 'constant', '${c}')"><code>${c}</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\n`;
        }
    }
    if (editableProject) {
        s += '<li class="clickable new" onclick="showNewConstantDialog()"><i>New constant…</i></li>';
    }
    s += '</ul>';

    s += '</div></div>';
    s += '<div style="margin-left: 3px; position: relative; top: -2px">— <i>Assets</i>\n';
    s += '<ul class="assets">';
    {
        const keys = Object.keys(gameSource.assets);
        keys.sort();
        for (let i = 0; i < keys.length; ++i) {
            const assetName = keys[i];

            // Hide system assets
            if (assetName[0] === '$') { continue; }

            const asset = gameSource.assets[assetName];
            let type = asset.$jsonURL.match(/\.([^.]+)\.json$/i);
            if (type) { type = type[1].toLowerCase(); }

            const badge = isBuiltIn(asset.$jsonURL) ? 'builtin' : (isRemote(asset.$jsonURL) ? 'remote' : '');
                
            const contextMenu = editableProject ? `oncontextmenu="showAssetContextMenu('${assetName}')"` : '';
            s += `<li id="projectAsset_${assetName}" ${contextMenu} onclick="onProjectSelect(event.target, 'asset', gameSource.assets['${assetName}'])" class="clickable ${type} ${badge}" title="${assetName} (${asset.$jsonURL})"><code>${assetName}</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>`;

            if (type === 'map') {
                for (let k in asset.spritesheet_table) {
                    const badge = isBuiltIn(asset.spritesheet_table[k].$jsonURL) ? 'builtin' : (isRemote(asset.spritesheet_table[k].$jsonURL) ? 'remote' : '');
                    s += `<ul><li id="projectAsset_${assetName}.${k}" onclick="onProjectSelect(event.target, 'asset', gameSource.assets['${assetName}'].spritesheet_table['${k}'])" class="clickable sprite ${badge}" title="${k} (${asset.spritesheet_table[k].$jsonURL})"><code>${k}</code></li></ul>\n`;
                }
            }
        } // for each asset
    }
    
    if (editableProject) {
        s += '<li class="clickable import" onclick="showAddAssetDialog()"><i>Import existing asset…</i></li>';
        s += '<li class="clickable new" onclick="showNewAssetDialog()"><i>Create new asset…</i></li>';
    }
    s += '</ul>';
    s += '</div>'
    
    // Build the project list for the IDE
    const projectElement = document.getElementById('project');

    // Hide the scrollbars on Windows
    projectElement.innerHTML = '<div class="hideScrollBars">' + s + '</div>';
}