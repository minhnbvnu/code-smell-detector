function wrapInValue(num) {
    if (num === undefined)
        return undefined;
    if (typeof num === "number")
        return pfloat(num);
    return num;
}