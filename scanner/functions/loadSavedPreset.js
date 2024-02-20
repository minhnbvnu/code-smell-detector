function loadSavedPreset(tool, lang, defaultpreset) {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (this.responseText.trim() != "nil") {
                $("#currentLoadTest").val(this.responseText.trim());
            } else {
                $("#currentLoadTest").val(defaultpreset);
            }
        }
    };;
    oReq.open("GET", k8s_url + "/chaos/loadpreset?name=" + tool + "&lang=" + lang);
    oReq.send()
    var now = new Date().toLocaleString().replace(',','')
    $('#alert_placeholder_programming_mode').replaceWith(alert_div + '[' + now + '] Open preset for ' + tool + '</div>');
    //$('#alert_placeholder').replaceWith(alert_div + '[' + now + '] Open preset for ' + tool + '</div>');
}