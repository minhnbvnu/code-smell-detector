function _append(str, val, encode) {
                var j;
                if(str.constructor === Array) {
                    for(j = 0; j < str.length; j++) {
                        str[j] = str[j] + (encode ? encodeURIComponent(val) : val);
                    }
                }
                else {
                    str = str + (encode ? encodeURIComponent(val) : val);
                }
                return str;
            }