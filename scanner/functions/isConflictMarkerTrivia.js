function isConflictMarkerTrivia(text, pos) {
            Debug.assert(pos >= 0);
            if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
                const ch = text.charCodeAt(pos);
                if (pos + mergeConflictMarkerLength < text.length) {
                    for (let i = 0; i < mergeConflictMarkerLength; i++) {
                        if (text.charCodeAt(pos + i) !== ch) {
                            return false;
                        }
                    }
                    return ch === 61 /* equals */ || text.charCodeAt(pos + mergeConflictMarkerLength) === 32 /* space */;
                }
            }
            return false;
        }