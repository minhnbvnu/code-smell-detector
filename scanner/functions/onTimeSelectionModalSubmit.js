function onTimeSelectionModalSubmit(ev) {
        if (ev.keyCode === 13) { // return key
            const time = $(this).val();
            if (time.indexOf(':') > -1) {
                player.setTime(convertTimestampToSeconds(time));
            } else {
                // assume user is thinking in minutes
                player.setTime(parseFloat(time) * 60);
            }
            hide();
        }
    }