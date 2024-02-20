function findLinkNameEnd(text) {
            let pos = text.indexOf("://");
            if (pos === 0) {
                while (pos < text.length && text.charCodeAt(pos) !== 124 /* bar */)
                    pos++;
                return pos;
            }
            if (text.indexOf("()") === 0)
                return 2;
            if (text.charAt(0) === "<") {
                let brackets2 = 0;
                let i = 0;
                while (i < text.length) {
                    if (text[i] === "<")
                        brackets2++;
                    if (text[i] === ">")
                        brackets2--;
                    i++;
                    if (!brackets2)
                        return i;
                }
            }
            return 0;
        }