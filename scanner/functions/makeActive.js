function makeActive(menuItem) {
        document.querySelectorAll('#sidebar > #nav > .nav-item').forEach(it => {
            it.classList.remove('active');
        });
        document.querySelectorAll('#panel > *').forEach(it => {
            it.style.display = 'none';
        });
        menuItem.classList.add('active');
        let id = menuItem.id;
        document.querySelector('#panel > .' + id).style.display = '';
    }