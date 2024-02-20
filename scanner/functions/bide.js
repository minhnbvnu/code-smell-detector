function bide(){
    if (document.webL10n.getReadyState() === 'complete' ) {
        applyLang();
        addMarkup();
    } else {
        setTimeout(function(){
            bide();
        },50);
    }
}