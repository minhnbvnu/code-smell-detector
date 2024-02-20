function ToDBC(txtstring) {
        txtstring = utils.html(txtstring);
        var tmp = "";
        var mark = "";/*用于判断,如果是html尖括里的标记,则不进行全角的转换*/
        for (var i = 0; i < txtstring.length; i++) {
            if (txtstring.charCodeAt(i) == 32) {
                tmp = tmp + String.fromCharCode(12288);
            }
            else if (txtstring.charCodeAt(i) < 127) {
                tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            }
            else {
                tmp += txtstring.charAt(i);
            }
        }
        return tmp;
    }