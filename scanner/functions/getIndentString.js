function getIndentString(level) {
            const singleLevel = indentStrings[1];
            for (let current = indentStrings.length; current <= level; current++) {
                indentStrings.push(indentStrings[current - 1] + singleLevel);
            }
            return indentStrings[level];
        }