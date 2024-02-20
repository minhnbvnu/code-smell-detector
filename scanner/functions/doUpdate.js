function doUpdate() {
    onStopButton();
    // Display a downloading window
    document.getElementById('updateDialog').classList.remove('hidden');

    // Tell the server to update (it will choose the right mechanism)
    postToServer({command: 'update'})

    // Start polling for when the server finishes updating
    const checker = setInterval(function () {
        const progressURL = location.origin + getQuadPath() + 'console/_update_progress.json';

        fetch(progressURL).
            then(response => response.json()).
            then(json => {
                if (json.done) {
                    clearInterval(checker);
                    if (json.restartServer) {
                        postToServer({command: 'quit'});

                        showAlertDialog(
                            'Update',
                            'Update complete. quadplay✜ needs to be restarted after this update.',
                            function () {
                                window.close();
                                location = 'about:blank';
                            },
                            noop,
                            'Restart');
                    } else {
                        showAlertDialog('Update', 'Update complete!', function () {
                            // Refresh, also forcing clean reload on Firefox
                            location.reload(true);
                        });
                    }
                }
            });
    }, 1000);
}