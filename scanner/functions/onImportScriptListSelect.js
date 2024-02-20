function onImportScriptListSelect(target) {
    const list = document.getElementById('importScriptListOL');
    for (let i = 0; i < list.children.length; ++i) {
        list.children[i].classList.remove('selected');
    }
    target.classList.add('selected');
    list.selected = target.innerText;

    document.getElementById('importScriptImportButton').disabled = false;
}