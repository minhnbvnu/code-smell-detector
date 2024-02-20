function checkDownloadAttrSupport() {
    var a = document.createElement('a');
    return (typeof a.download != "undefined");
}