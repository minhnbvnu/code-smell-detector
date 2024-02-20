function getFormattedContents(contents, contentFormatter) {
    let formattedContents = {};
    for (let contentType in contents) {
        formattedContents[contentType] = getFormattedContent(contents[contentType], contentFormatter[contentType]);
    }    
    return formattedContents;
}