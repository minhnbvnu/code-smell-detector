function showDocContextMenu(docURL) {
    if (! gameSource.docs) { return; }

    console.assert(docURL);
    const id = 'DocItem_' + docURL;
    const filename = urlFilename(docURL);
    const builtIn = isBuiltIn(docURL);

    const index = gameSource.docs.indexOf(docURL);
    console.assert(index !== -1);
    
    let s = `<div onmousedown="onProjectSelect(document.getElementById('${id}'), 'doc', '${docURL}'])">${builtIn ? 'View' : 'Edit'}</div>`;
    s += `<hr><div onmousedown="onRemoveDoc('${docURL}')"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&times;</span>Remove ${filename}</div>`

    customContextMenu.innerHTML = s;
    showContextMenu('project');
}