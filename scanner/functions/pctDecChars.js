function pctDecChars(str) {
            var newStr = "";
            var i = 0;
            var il = str.length;
            while (i < il) {
                var c = parseInt(str.substr(i + 1, 2), 16);
                if (c < 128) {
                    newStr += String.fromCharCode(c);
                    i += 3;
                }
                else if (c >= 194 && c < 224) {
                    if (il - i >= 6) {
                        var c2 = parseInt(str.substr(i + 4, 2), 16);
                        newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
                    }
                    else {
                        newStr += str.substr(i, 6);
                    }
                    i += 6;
                }
                else if (c >= 224) {
                    if (il - i >= 9) {
                        var _c = parseInt(str.substr(i + 4, 2), 16);
                        var c3 = parseInt(str.substr(i + 7, 2), 16);
                        newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
                    }
                    else {
                        newStr += str.substr(i, 9);
                    }
                    i += 9;
                }
                else {
                    newStr += str.substr(i, 3);
                    i += 3;
                }
            }
            return newStr;
        }