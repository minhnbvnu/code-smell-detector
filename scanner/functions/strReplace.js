function strReplace(str, repArray = []) {
    repArray.forEach(rep => {
        const [template, value] = rep;
        str = str.replace(template, value);
    });
    return str;
}