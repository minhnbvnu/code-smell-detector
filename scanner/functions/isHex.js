function isHex(literal) {
    const reg = /^[0-9a-f]+$/i;

    //test for '0x' separately because hex notation should not be a part of the standard RegExp
    if (literal.slice(0, 2) !== "0x") {
        return false;
    }

    return reg.test(literal.slice(2));
}