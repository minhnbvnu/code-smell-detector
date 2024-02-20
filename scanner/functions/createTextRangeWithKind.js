function createTextRangeWithKind(pos, end, kind) {
            const textRangeWithKind = { pos, end, kind };
            if (Debug.isDebugging) {
                Object.defineProperty(textRangeWithKind, "__debugKind", {
                    get: () => Debug.formatSyntaxKind(kind)
                });
            }
            return textRangeWithKind;
        }