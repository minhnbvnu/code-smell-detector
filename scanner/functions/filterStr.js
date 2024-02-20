function filterStr(str, type, replaceStr = '') {
    let arr = Array.prototype.slice.call(arguments);
    let fnName = 'filter' + firstWordUpper(type);
    arr.splice(1, 1);
    return filterObj[fnName] ? filterObj[fnName].apply(null, arr) : false;
}