function workTimeEndSoundSetting(val) {
    store.set("time-end-sound", val);
    $("#work-time-end-sound-dropdown-button").text(val);
    if (val !== i18n.__('custom'))
        try {
            $(".custom-notify-sound-work-time-end").css("display", "none");
            let player = document.createElement("audio");//alert player
            player.src = path.join(__dirname, "\\res\\sound\\" + val + ".mp3");
            player.loop = false;
            player.play();
        } catch (e) {
            console.log(e);
        }
    else
        $(".custom-notify-sound-work-time-end").css("display", "inline-block");
}