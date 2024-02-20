function escape_literal(str) {
            return str.replace(/\r|\\|`|\${/g, function(s) {
                return "\\" + (s == "\r" ? "r" : s);
            });
        }