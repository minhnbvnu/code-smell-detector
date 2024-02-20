function encryptStr(str, regIndex, ARepText = '*') {
    let regText = '',
        Reg = null,
        _regIndex = regIndex.split(','),
        replaceText = ARepText;
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    _regIndex = _regIndex.map(item => +item);
    regText = '(\\w{' + _regIndex[0] + '})\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '}';
    Reg = new RegExp(regText);
    //let replaceCount = repeatStr(replaceText, (1 + _regIndex[1] - _regIndex[0]));
    let replaceCount = replaceText.repeat((1 + _regIndex[1] - _regIndex[0]));
    return str.replace(Reg, '$1' + replaceCount);
}