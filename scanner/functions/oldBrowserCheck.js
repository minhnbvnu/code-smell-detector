function oldBrowserCheck(){
    if ( html5Support() === false ){
        var oldBrowserWarning = document.webL10n.get('old-browser-warning');
        document.getElementById('old-browser').innerHTML = oldBrowserWarning;
    }
}