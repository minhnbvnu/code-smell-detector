function scanConflictMarkerTrivia(text, pos, error) {
            if (error) {
                error(Diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength);
            }
            const ch = text.charCodeAt(pos);
            const len = text.length;
            if (ch === 60 /* lessThan */ || ch === 62 /* greaterThan */) {
                while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
                    pos++;
                }
            }
            else {
                Debug.assert(ch === 124 /* bar */ || ch === 61 /* equals */);
                while (pos < len) {
                    const currentChar = text.charCodeAt(pos);
                    if ((currentChar === 61 /* equals */ || currentChar === 62 /* greaterThan */) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                        break;
                    }
                    pos++;
                }
            }
            return pos;
        }