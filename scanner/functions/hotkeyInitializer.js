function hotkeyInitializer() {
    for (let i in hotkeyList) {
        $("#hotkey-box").append("\
                <div class=\"col-6\">\
                <label id = \"hotkey-for-" + hotkeyList[i].name + "\" class= \"hotkey-set-label text-muted settings-msg\" ></label>\
                </div><div class=\"col-6\">\
            <input id=\"hotkey-" + hotkeyList[i].name + "\" class=\"hotkey-set-input extreme-small\" type=\"text\" maxlength=\"64\"\
                onclick=\"keyDownCapturer(\'" + hotkeyList[i].name + "\')\" onblur=\"keyDownTriggerRemover()\" /></div><br />");
        $("#hotkey-for-" + hotkeyList[i].name).text(i18n.__("hotkey-for-" + hotkeyList[i].name));
        $("#hotkey-" + hotkeyList[i].name).val(hotkeyList[i].value);
    }
}