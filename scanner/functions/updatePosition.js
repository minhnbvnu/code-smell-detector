function updatePosition(str) {
            var lines = str.match(/\n/g);
            if (lines)
                lineno += lines.length;
            var i = str.lastIndexOf('\n');
            column = ~i ? str.length - i : column + str.length;
        }