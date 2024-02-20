function convertClassificationsToResult(classifications, text) {
            const entries = [];
            const dense = classifications.spans;
            let lastEnd = 0;
            for (let i = 0; i < dense.length; i += 3) {
                const start = dense[i];
                const length2 = dense[i + 1];
                const type = dense[i + 2];
                if (lastEnd >= 0) {
                    const whitespaceLength2 = start - lastEnd;
                    if (whitespaceLength2 > 0) {
                        entries.push({ length: whitespaceLength2, classification: 4 /* Whitespace */ });
                    }
                }
                entries.push({ length: length2, classification: convertClassification(type) });
                lastEnd = start + length2;
            }
            const whitespaceLength = text.length - lastEnd;
            if (whitespaceLength > 0) {
                entries.push({ length: whitespaceLength, classification: 4 /* Whitespace */ });
            }
            return { entries, finalLexState: classifications.endOfLineState };
        }