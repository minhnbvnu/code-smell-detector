function encryptUnStr(str, regIndex, ARepText = '*') {
    let regText = '',
        Reg = null,
        _regIndex = regIndex.split(','),
        replaceText = ARepText;
    _regIndex = _regIndex.map(item => +item);
    regText = '(\\w{' + _regIndex[0] + '})(\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '})(\\w{' + (str.length - _regIndex[1] - 1) + '})';
    Reg = new RegExp(regText);
    //let replaceCount1 = repeatStr(replaceText, _regIndex[0]);
    let replaceCount1 = replaceText.repeat(_regIndex[0]);
    //let replaceCount2 = repeatStr(replaceText, str.length - _regIndex[1] - 1);
    let replaceCount2 = replaceText.repeat(str.length - _regIndex[1] - 1);
    return str.replace(Reg, replaceCount1 + '$2' + replaceCount2);
}