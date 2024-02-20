function showAssetContextMenu(assetName) {
    const getElement = `document.getElementById('projectAsset_${assetName}')`;

    let externalCmds = '';
    if (gameSource.assets) {
        const url = gameSource.assets[assetName]._sourceURL || gameSource.assets[assetName].$url;
        if (! isRemote(url) && !isBuiltIn(url)) {
            if (serverConfig.hasFinder) {
                externalCmds += `<div onmousedown="onOpenAssetExternally('<finder>', '${assetName}')">Show in ${isApple ? 'Finder' : 'Explorer'}</div>`;
            }

            const ext = url.split('.').pop();
            const list = serverConfig.applications;
            if (list) {
                for (let i = 0; i < list.length; ++i) {
                    if (list[i].types.indexOf(ext) !== -1) {
                        externalCmds += `<div onmousedown="onOpenAssetExternally('${list[i].path}', '${assetName}')">Open ${ext.toUpperCase()} with ${list[i].name}</div>`;
                    }
                }
            }

            if (externalCmds.length > 0) {
                externalCmds = '<hr>' + externalCmds;
            }
        }    
    }

    customContextMenu.innerHTML =
        `<div onmousedown="onProjectSelect(${getElement}, 'asset', gameSource.assets['${assetName}'])">Inspect</div>
        <div onmousedown="onRenameAsset('${assetName}')">Rename&hellip;</div>
        <div onmousedown="onCloneAsset('${assetName}')">Clone&hellip;</div>` +
        externalCmds + 
        `<hr><div onmousedown="onRemoveAsset('${assetName}')"><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&times;</span>Remove '${assetName}'</div>`;
    showContextMenu('project');
}