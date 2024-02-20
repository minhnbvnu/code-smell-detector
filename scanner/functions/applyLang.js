function applyLang(callback){
    var lang = localStorageManager.getItem('oTranscribe-language');
    if(lang) {
        document.webL10n.setLanguage(lang);
    } else {
        document.webL10n.setLanguage('en');
    }
}