function clonePaste() {
    stateNewPaste();
    
    //Erase the id and the key in url
    history.replaceState(document.title, document.title, scriptLocation());
    
    showStatus('');
    $('textarea#message').text($('div#cleartext').text());
}