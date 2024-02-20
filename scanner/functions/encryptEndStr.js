function encryptEndStr(str, length, replaceText = '*') {
    return encryptStartStr(str.split('').reverse().join(''), length, replaceText).split('').reverse().join('');
}