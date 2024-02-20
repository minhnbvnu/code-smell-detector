function showScriptContextMenu(scriptURL) {
    if (! gameSource.scripts) { return; }

    console.assert(scriptURL);
    const id = 'ScriptItem_' + scriptURL;
    const filename = urlFilename(scriptURL);
    const builtIn = isBuiltIn(scriptURL);

    const index = gameSource.scripts.indexOf(scriptURL);
    console.assert(index !== -1);
    
    let s = `<div onmousedown="onProjectSelect(document.getElementById('${id}'}), 'script', '${scriptURL}'])">${builtIn ? 'View' : 'Edit'}</div>`;
    if (index > 0) {
        s += `<div onmousedown="onMoveScript('${scriptURL}', -1)"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&uarr;</span>Execute earlier</div>`
    }

    if (index < gameSource.scripts.length - 1) {
        s += `<div onmousedown="onMoveScript('${scriptURL}', +1)"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&darr;</span>Execute later</div>`
    }
    if (! builtIn) {
        s += `<div onmousedown="onRenameScript('${scriptURL}')">Rename&hellip;</div>`
    }
    s += `<hr><div onmousedown="onRemoveScript('${scriptURL}')"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&times;</span>Remove ${filename}</div>`

    customContextMenu.innerHTML = s;
    showContextMenu('project');
}