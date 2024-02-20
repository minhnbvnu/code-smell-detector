function personalizationSoundInitializer() {
    if (store.has("custom-work-time-end-sound"))
        $("#custom-notify-sound-work-time-end").val(store.get("custom-work-time-end-sound"));
    if (store.has("custom-all-time-end-sound"))
        $("#custom-notify-sound-all-time-end").val(store.get("custom-work-all-end-sound"));
    let player = document.createElement("audio");//alert player
    let soundList = ['alarming', 'beep', 'clock', 'tick', 'trumpet', 'whistle', 'horns', 'magic', 'piano', i18n.__('custom')];
    for (let i in soundList) {
        $("#work-time-end-sound-select").append("\
                    <a class='dropdown-item' href='javascript:workTimeEndSoundSetting(\"" + soundList[i] + "\")'>"
            + soundList[i] + "</a>");
    }
    $("#work-time-end-sound-dropdown-button").text(store.has("time-end-sound") ? store.get("time-end-sound") : "tick");
    if (store.get("time-end-sound") === i18n.__('custom'))
        $(".custom-notify-sound-work-time-end").css("display", "inline-block");
    else
        $(".custom-notify-sound-work-time-end").css("display", "none");

    for (let i in soundList) {
        $("#all-time-end-sound-select").append("\
                    <a class='dropdown-item' href='javascript:allTimeEndSoundSetting(\"" + soundList[i] + "\")'>"
            + soundList[i] + "</a>");
    }
    $("#all-time-end-sound-dropdown-button").text(store.has("all-end-sound") ? store.get("all-end-sound") : "piano");
    if (store.get("all-end-sound") === i18n.__('custom'))
        $(".custom-notify-sound-all-time-end").css("display", "inline-block");
    else
        $(".custom-notify-sound-all-time-end").css("display", "none");
}