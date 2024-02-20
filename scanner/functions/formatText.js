function formatText(str, size = 3, delimiter = ',') {
    let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
    let reg = new RegExp(regText, 'g');
    return str.replace(reg, delimiter);
}