function diffLinesToCharsMunge(text) {
            var chars, lineStart, lineEnd, lineArrayLength, line;
            chars = "";
            // Walk the text, pulling out a substring for each line.
            // text.split('\n') would would temporarily double our memory footprint.
            // Modifying text would create many large strings to garbage collect.
            lineStart = 0;
            lineEnd = -1;
            // Keeping our own length variable is faster than looking it up.
            lineArrayLength = lineArray.length;
            while (lineEnd < text.length - 1) {
                lineEnd = text.indexOf("\n", lineStart);
                if (lineEnd === -1) {
                    lineEnd = text.length - 1;
                }
                line = text.substring(lineStart, lineEnd + 1);
                lineStart = lineEnd + 1;

                if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
                    (lineHash[line] !== undefined)) {
                    chars += String.fromCharCode( lineHash[ line ] );
                } else {
                    chars += String.fromCharCode(lineArrayLength);
                    lineHash[line] = lineArrayLength;
                    lineArray[lineArrayLength++] = line;
                }
            }
            return chars;
        }