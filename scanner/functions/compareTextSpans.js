function compareTextSpans(a, b) {
            return compareValues(a == null ? void 0 : a.start, b == null ? void 0 : b.start) || compareValues(a == null ? void 0 : a.length, b == null ? void 0 : b.length);
        }