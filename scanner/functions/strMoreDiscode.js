function strMoreDiscode(str){
    str = str.replace(/\r\n/g,"");  
    str = str.replace(/\n/g,"");

    str = str.replace(/code/g,"wxxxcode-style");
    return str;
}