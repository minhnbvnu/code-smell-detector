function countWords(str){
    var trimmedStr = $.trim(str);
    if (trimmedStr){
        return trimmedStr.match(/\S+/gi).length;
    }
    return 0;
}