function colorInitializer() {
    for (let i in themeColorList) {
        $("#color-box").append("\
                <div class=\"col-6\">\
                <label id = \"color-label-" + i + "\" class= \"hotkey-set-label text-muted settings-msg\" ></label>\
                </div><div class=\"col-6\">\
            <input id=\"color-" + i + "\" class=\"hotkey-set-input extreme-small\" data-jscolor=\"\" onchange=\"colorSet(" + i + ")\" /></div><br />");
        $("#color-label-" + i).text(colorNameList[i]);
        $("#color-" + i).val(themeColorList[i]);
    }
}