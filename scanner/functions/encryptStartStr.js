function encryptStartStr(str, length, replaceText = '*') {
    let regText = '(\\w{' + length + '})';
    let Reg = new RegExp(regText);
    //let replaceCount = repeatStr(replaceText, length);
    let replaceCount = replaceText.repeat(length);
    return str.replace(Reg, replaceCount);
}