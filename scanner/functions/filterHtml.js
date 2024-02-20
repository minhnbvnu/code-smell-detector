function filterHtml(str, replaceStr = '') {
    //return str.replace(/<\/?[^>]*>/g, replaceStr);
    return filterObj.filterHtml.apply(null, arguments);
}