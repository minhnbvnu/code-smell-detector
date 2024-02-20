function replaceS(matcher, str, replacement) {
        const chunks = [];
        let index = 0;
        /** @type {RegExpExecArray} */
        let match = null;
        /**
         * @param {string} key The placeholder.
         * @returns {string} The replaced string.
         */
        function replacer(key) {
            switch (key) {
                case "$$":
                    return "$";
                case "$&":
                    return match[0];
                case "$`":
                    return str.slice(0, match.index);
                case "$'":
                    return str.slice(match.index + match[0].length);
                default: {
                    const i = key.slice(1);
                    if (i in match) {
                        return match[i];
                    }
                    return key;
                }
            }
        }
        for (match of matcher.execAll(str)) {
            chunks.push(str.slice(index, match.index));
            chunks.push(replacement.replace(placeholder, replacer));
            index = match.index + match[0].length;
        }
        chunks.push(str.slice(index));
        return chunks.join("");
    }