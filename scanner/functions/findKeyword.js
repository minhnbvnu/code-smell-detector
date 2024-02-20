function findKeyword(str, key, tag = 'span') {
    let arr = null, regStr = null, content = null, Reg = null;
    //alert(regStr); //    如：(前端|过来)
    regStr = "(" + key.split(/\s+/).join('|') + ")";
    //alert(regStr); //    如：(前端|过来)
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, "g");
    //过滤html标签 替换标签，往关键字前后加上标签
    content = content.replace(/<\/?[^>]*>/g, '')
    return content.replace(Reg, "<" + tag + ">$1</" + tag + ">");
}