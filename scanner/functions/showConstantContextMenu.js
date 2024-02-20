function showConstantContextMenu(constantName) {
    const getElement = `document.getElementById('projectConstant_${constantName}')`;
    customContextMenu.innerHTML =
        `<div onmousedown="onProjectSelect(${getElement}, 'constant', '${constantName}')">Change Value</div>
        <div onmousedown="onRenameConstant('${constantName}')">Rename&hellip;</div>
        <div onmousedown="onEditConstantDescription('${constantName}')">Edit Description&hellip;</div>
        <hr><div onmousedown="onRemoveConstant('${constantName}')""><span style="margin-left:-18px; width:18px; display:inline-block; text-align:center">&times;</span>Remove '${constantName}'</div>`;
    showContextMenu('project');
}