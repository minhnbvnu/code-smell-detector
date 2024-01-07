function isCodeBetween(string, begin, end) {
    if (!string)
        return false;
    const codeData = getCodePointData(string);
    if (codeData) {
        const code = codeData.code;
        return code >= begin && code <= end;
    }
    return false;
}