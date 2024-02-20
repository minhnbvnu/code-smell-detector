function replaceF(matcher, str, replace) {
        const chunks = [];
        let index = 0;
        for (const match of matcher.execAll(str)) {
            chunks.push(str.slice(index, match.index));
            chunks.push(String(replace(...match, match.index, match.input)));
            index = match.index + match[0].length;
        }
        chunks.push(str.slice(index));
        return chunks.join("");
    }