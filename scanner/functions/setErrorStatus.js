function setErrorStatus(e, location) {
    e = escapeHTMLEntities(e);

    if (location) {
        if (location.line_number !== undefined) {
            e = `${location.fcn ? location.fcn + ' at ' : ''}<a style="font-family: Arial; cursor:pointer">${shortURL(location.url)}:${location.line_number}</a>: ${e}`;
        } else if (location.url) {
            e = `${location.fcn ? location.fcn + ' at ' : ''}${shortURL(location.url)}: ${e}`;
        } else if (location.fcn) {
            e = location.fcn + ': ' + e;
        }
    }
    
    error.innerHTML = e;
    if (e !== '') {
        $outputAppend(`\n<span style="color:#f55">${e}<span>\n`, location, location !== undefined);
    }
}