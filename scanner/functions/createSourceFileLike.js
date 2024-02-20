function createSourceFileLike(text, lineMap) {
            return {
                text,
                lineMap,
                getLineAndCharacterOfPosition(pos) {
                    return computeLineAndCharacterOfPosition(getLineStarts(this), pos);
                }
            };
        }