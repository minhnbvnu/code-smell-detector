function loadJSX() {
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    console.log('[Extension Root]%s'+extensionRoot);
    new CSInterface().evalScript('$._ext.evalFiles("' + extensionRoot + '")');
}