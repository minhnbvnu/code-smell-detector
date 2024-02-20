function clearKeys(obj, keepValues = [0, false]) {
    keepValues.forEach((item, index) => {
        keepValues[index] = Number.isNaN(item) ? 'NaN' : item
    });
    let _newPar = {};
    for (let key in obj) {
        if (checkValue(obj[key], keepValues) || (obj[key] && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '')) {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}