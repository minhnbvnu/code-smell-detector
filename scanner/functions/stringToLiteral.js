function stringToLiteral(value, length) {
        var result = "";
        var addChar = function (index) {
            var ch = value.charCodeAt(index);
            switch(ch) {
                case 9: {
                    result += "\\t";
                    break;

                }
                case 10: {
                    result += "\\n";
                    break;

                }
                case 11: {
                    result += "\\v";
                    break;

                }
                case 12: {
                    result += "\\f";
                    break;

                }
                case 13: {
                    result += "\\r";
                    break;

                }
                case 34: {
                    result += "\\\"";
                    break;

                }
                case 39: {
                    result += "\\\'";
                    break;

                }
                case 92: {
                    result += "\\";
                    break;

                }
                default: {
                    result += value.charAt(index);

                }
            }
        };
        var tooLong = (value.length > length);
        if(tooLong) {
            var mid = length >> 1;
            for(var i = 0; i < mid; i++) {
                addChar(i);
            }
            result += "(...)";
            for(var i = value.length - mid; i < value.length; i++) {
                addChar(i);
            }
        } else {
            length = value.length;
            for(var i = 0; i < length; i++) {
                addChar(i);
            }
        }
        return result;
    }