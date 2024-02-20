function filterChinese(str, replaceStr = '') {
    //return str.replace(/[\u4E00-\u9FA5]/g, replaceStr);
    return filterObj.filterChinese.apply(null, arguments);
}