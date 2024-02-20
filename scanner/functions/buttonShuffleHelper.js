function buttonShuffleHelper() {
    if (shuffle) {
        shuffle = false;
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Shuffle Disable</div>');
        $("#buttonShuffle").text("Enable Shuffle");
    }
    else {
        shuffle = true
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Shuffle Enabled</div>');
        $("#buttonShuffle").text("Disable Shuffle");
    }
}