function getFilename() {
    return document.webL10n.get('file-name') + " " + (new Date()).toUTCString();
}