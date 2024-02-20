function getHelp(idCode) {
    require('electron').shell.openExternal(isChinese ?
        'https://getwnr.com/zh/' + idCode + '.html' :
        'https://getwnr.com/' + idCode + '.html');
}