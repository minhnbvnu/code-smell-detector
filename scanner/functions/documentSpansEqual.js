function documentSpansEqual(a, b) {
            return a.fileName === b.fileName && textSpansEqual(a.textSpan, b.textSpan);
        }