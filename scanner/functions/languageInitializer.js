function languageInitializer() {
    for (let i in languageList) {
        $("#i18n").append("\
                    <a class='dropdown-item' href='javascript:languageSetting(\"" + languageList[i] + "\")'>"
            + languageNameList[i] + "</a>");
        if (store.get("i18n") === languageList[i]) {
            $("#language-dropdown-button").text(languageNameList[i]);
        }
    }
}