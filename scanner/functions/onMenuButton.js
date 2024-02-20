function onMenuButton(event) {
    closeDropdowns();
    const button = document.getElementById(event.target.id);
    const menu = document.getElementById(event.target.id.replace(/Button$/, ''));

    if (menu.style.visibility === 'visible') {
        menu.style.visibility = 'hidden';
    } else {
        menu.style.visibility = 'visible';
        menu.style.left = button.getBoundingClientRect().left + 'px';
    }

    event.stopPropagation();
}