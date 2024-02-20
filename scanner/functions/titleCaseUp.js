function titleCaseUp(str, splitType = /\s+/g) {
    //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
    let strArr = str.split(splitType),
        result = "";
    strArr.forEach(item => {
        result += firstWordUpper(item, 1) + ' ';
    });
    return trimRight(result)
}