function getProjectionCode(code) {
    let newcode = '';
    const codeArray = code.split('');
    for (let len = codeArray.length, i = len - 1; i >= 0; i--) {
        if (!isNaN(codeArray[i])) {
            newcode = codeArray[i] + newcode;
        } else {
            break;
        }
    }
    return newcode;
}