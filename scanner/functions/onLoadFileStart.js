function onLoadFileStart(url) {
    // console.log('Fetching "' + url + '"');
    appendToBootScreen('Fetching ' + url.replace(/^.*\//, ''));
}