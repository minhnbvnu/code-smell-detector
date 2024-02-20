function onOpenGameListSelect(target, url) {
    const list = document.getElementById('openGameListOL');
    for (let i = 0; i < list.children.length; ++i) {
        list.children[i].classList.remove('selected');
    }
    target.classList.add('selected');
    openGameFiles.selected = url; 
    document.getElementById('openGameOpenButton').disabled = false;
}