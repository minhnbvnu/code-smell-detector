function bindPlayerToUI(filename = '') {
    
    const shortcuts = getSettings().keyboardShortcuts.shortcuts;

    const player = getPlayer();
    if (!player) {
        return;
    }

    const $playPauseButton = $('.play-pause');
    
    var skippingButtonInterval;
    addKeyboardShortcut(shortcuts.backwards, player.skip.bind(player, 'backwards'));
    addKeyboardShortcut(shortcuts.forwards, player.skip.bind(player, 'forwards'));
    
    $('.skip-backwards').off().mousedown(function(){
        player.skip('backwards');
        skippingButtonInterval = setInterval(() => {
            player.skip('backwards');
        },100);
    }).mouseup(function(){
        clearInterval(skippingButtonInterval);
    });
    $('.skip-forwards').off().mousedown(function(){
        player.skip('forwards');    
        skippingButtonInterval = setInterval(() => {
            player.skip('forwards');
        },100);
    }).mouseup(function(){
        clearInterval(skippingButtonInterval);
    });
    
    $playPauseButton.off().click(playPause);
    addKeyboardShortcut(shortcuts.playPause, playPause)
    
    addKeyboardShortcut(shortcuts.timeSelection, timeSelectionModal.toggle);
    $('.player-time').off().click(timeSelectionModal.toggle);
    
    let changingSpeed = false;
    $('.speed-slider')
        .attr('min', player.minSpeed)
        .attr('max', player.maxSpeed)
        .attr('step', player.speedIncrement)
        .off()
        .on('change', function() {
            player.setSpeed(this.valueAsNumber);
        });

    player.onSpeedChange((speed) => {
        $('.speed-slider').val( speed );            
    });

    addKeyboardShortcut(shortcuts.speedDown, () => {
        player.speed('down');
    });
    addKeyboardShortcut(shortcuts.speedUp, () => {
        player.speed('up');
    });

    // make speed box sticky if button is clicked
    $( ".speed" ).off().mousedown(function() {
        if ($('.speed-box').not(':hover').length) {
            $(this).toggleClass('fixed');
        }    
    });

    const playerHook = document.querySelector('#player-hook');
    playerHook.innerHTML = '';
    if (document.querySelector('audio, video')) {
        var progressBar = new Progressor({
            media : document.querySelector('audio, video'),
            bar : playerHook,
            text : filename,                       
            time : document.querySelector('.player-time'),
            hours: true
        });
        document.querySelector('.player-time').style.display = 'block';
    } else {
        document.querySelector('.player-time').style.display = 'none';
    }
    
    player.onPlayPause(status => {
        if (status === 'playing'){
            $playPauseButton.addClass('playing');
        } else {
            $playPauseButton.removeClass('playing');
        }
    });
    
    setKeyboardShortcutsinUI();
    
    function playPause() {
        if (player.getStatus() !== 'playing'){
            player.play();
            $playPauseButton.addClass('playing');
        } else {
            player.pause();
            $playPauseButton.removeClass('playing');
        }
    };
    
}