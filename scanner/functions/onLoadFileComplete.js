function onLoadFileComplete(url) {
    //console.log('Processing "' + url + '"');
    appendToBootScreen('Processing ' + url.replace(/^.*\//, ''));
}