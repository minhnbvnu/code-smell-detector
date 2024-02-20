function setupHookForLinks() {
    if (isElectron()) {
        const { shell } = requireNode('electron');
        document.addEventListener('click', function(event) {
            const href = event.target.getAttribute('href');
            if (href && href.indexOf('http') === 0) {
                shell.openExternal(href);
                event.preventDefault();
            }
        });
    }
}