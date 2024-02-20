function DBC2SB(str) {
        var result = '';
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i); //获取当前字符的unicode编码
            if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
            {
                result += String.fromCharCode(str.charCodeAt(i) - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
            } else if (code == 12288)//空格
            {
                result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
            } else {
                result += str.charAt(i);
            }
        }
        return result;
    }