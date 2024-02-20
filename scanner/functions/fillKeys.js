function fillKeys(obj, keepValues = [null, undefined, ''], val = '--') {
    keepValues.forEach((item, index) => {
        keepValues[index] = Number.isNaN(item) ? 'NaN' : item
    });
    let _newPar = {};
    for (let key in obj) {
        _newPar[key] = checkValue(obj[key], keepValues) ? val : obj[key];
    }
    return _newPar;
}