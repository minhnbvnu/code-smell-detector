function onLocalized() {
    const resetInput = inputSetup({
        create: file => {
            const driver = isVideoFormat(file) ? playerDrivers.HTML5_VIDEO : playerDrivers.HTML5_AUDIO;
		    createPlayer({
		        driver: driver,
		        source: window.URL.createObjectURL(file),
                name: file.name
		    }).then(() => {
                bindPlayerToUI(file.name);
		    });
        },
        createFromURL: url => {
		    createPlayer({
		        driver: playerDrivers.YOUTUBE,
		        source: url
		    }).then(() => {
                bindPlayerToUI();
		    });
        }
    });
    
    watchWordCount();

    var startText = document.webL10n.get('start-ready');
    $('.start')
        // .addClass('ready')
        .toggleClass('ready', !otrQueryParams.v)    // Show 'Loading...' text if a video is to be automatically initialized
        .off()
        .click(() => {
            viewController.set('editor');
        });
    
    $('.reset').off().on('click', () => {
        const player = getPlayer();
        resetInput();
        if (player) {
            player.destroy();
        }
    });
    
    oldBrowserCheck();
    // oT.input.loadPreviousFileDetails();
}