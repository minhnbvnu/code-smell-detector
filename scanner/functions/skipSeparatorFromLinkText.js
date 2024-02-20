function skipSeparatorFromLinkText(text) {
            let pos = 0;
            if (text.charCodeAt(pos++) === 124 /* bar */) {
                while (pos < text.length && text.charCodeAt(pos) === 32 /* space */)
                    pos++;
                return text.slice(pos);
            }
            return text;
        }