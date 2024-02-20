function strDiscode(str){
    str = strNumDiscode(str);
    str = strGreeceDiscode(str);
    str = strcharacterDiscode(str);
    str = strOtherDiscode(str);
    str = strMoreDiscode(str);
    return str;
}