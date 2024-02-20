function onOpenGameOpen() {
    onStopButton();
    saveIDEState();
    const autoplay = document.getElementById('autoplayOnLoad').checked;
    const newWindow = document.getElementById('newWindowOnLoad').checked;

    const game_url = openGameFiles.selected;
    
    let url = page.location.href.replace(/(\?(?:.+&)?)game=[^&]+(?=&|$)/, '$1');
    if (url.indexOf('?') === -1) { url += '?'; }
    if (url[url.length - 1] !== '&') { url += '&'; }
    url = url.replace(/autoplay=./g, '');
    url = url.replace(/&&/g, '&');
    url += 'game=' + game_url;
    
    if (autoplay) { url += '&autoplay=1'; }
    
    if (newWindow) {
        hideOpenGameDialog();
        window.open(url, '_blank');
    } else {
        // Update the URL so that reload and bookmarking work
        page.history.replaceState({}, 'quadplay', url);
        if (window !== page) {
            // Also replace the internal window URL so that updating reloads correctly
            history.replaceState({}, 'quadplay', url.replace('app.html', 'quadplay.html'));
        }
            
        loadGameIntoIDE(game_url, function () {
            hideOpenGameDialog();
            onProjectSelect(document.getElementsByClassName('projectTitle')[0], 'game');

            if (autoplay) {
                onPlayButton(false, true);
            }
        });
    } // if new window
}