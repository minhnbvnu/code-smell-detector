function onImportModeListSelect(target) {
    const list = document.getElementById('importModeListOL');
    for (let i = 0; i < list.children.length; ++i) {
        list.children[i].classList.remove('selected');
    }
    target.classList.add('selected');
    list.selected = target.innerText;

    document.getElementById('importModeImportButton').disabled = false;
}