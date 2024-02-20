function showContextMenu(parent) {
    if (typeof parent === 'string') {
        parent = document.getElementById(parent);
    }

    if (! parent) {
        parent = document.getElementsByTagName('body')[0];
    }

    parent.appendChild(customContextMenu);
    
    customContextMenu.style.left = event.pageX + 'px';
    customContextMenu.style.top = Math.min(event.pageY, window.innerHeight - 200) + 'px';
    customContextMenu.style.visibility = 'visible';
}