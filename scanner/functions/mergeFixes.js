function mergeFixes(fixes, sourceCode) {
        for (const fix of fixes) {
            assertValidFix(fix);
        }
        if (fixes.length === 0) {
            return null;
        }
        if (fixes.length === 1) {
            return fixes[0];
        }
        fixes.sort(compareFixesByRange);
        const originalText = sourceCode.text;
        const start = fixes[0].range[0];
        const end = fixes[fixes.length - 1].range[1];
        let text = "";
        let lastPos = Number.MIN_SAFE_INTEGER;
        for (const fix of fixes) {
            assert(fix.range[0] >= lastPos, "Fix objects must not be overlapped in a report.");
            if (fix.range[0] >= 0) {
                text += originalText.slice(Math.max(0, start, lastPos), fix.range[0]);
            }
            text += fix.text;
            lastPos = fix.range[1];
        }
        text += originalText.slice(Math.max(0, start, lastPos), end);
        return { range: [start, end], text };
    }