function languageCode() {
    let lang = (navigator.languages && navigator.languages.length > 0) ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage /* IE */ || 'en');
    lang = lang.toLowerCase();
    lang = lang.replace(/-/, "_"); // some browsers report language as en-US instead of en_US
    if (lang.length > 3) {
        lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
    }
    if (lang == "zh_TW" || lang == "zh_MO"){
        lang = "zh_HK"
    }
    return lang;
}