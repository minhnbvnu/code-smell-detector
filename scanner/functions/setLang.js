function setLang(lang){
    if (lang){
        localStorageManager.setItem('oTranscribe-language',lang);
        window.location.reload();
    }
}