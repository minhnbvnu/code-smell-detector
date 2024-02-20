function autosaveInit(){
    var field = document.querySelector("#textbox");
    
    // load existing autosave (if present)
    try {
        const autosaveContents = localStorageManager.getItem("autosave");
        if (autosaveContents) {        
           setEditorContents( localStorageManager.getItem("autosave") );
        }
    } catch (e) {
        // don't load autosave, as it's corrupted
    }
    // autosave every second - but wait five seconds before kicking in
    setTimeout(function(){
        // prevent l10n from replacing user text
        const markupWithL10nData = Array.from(
            field.querySelectorAll('p[data-l10n-id]')
        );
        markupWithL10nData.forEach(el => {
            el.removeAttribute('data-l10n-id');
        });
        setInterval(function(){
           localStorageManager.setItem("autosave", getTexteditorContents());
        }, 1000);
    }, 5000);
}