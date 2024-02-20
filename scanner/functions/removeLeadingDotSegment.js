function removeLeadingDotSegment(entry) {
        // We do not use `startsWith` because this is 10x slower than current implementation for some cases.
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        if (entry.charAt(0) === '.') {
            const secondCharactery = entry.charAt(1);
            if (secondCharactery === '/' || secondCharactery === '\\') {
                return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
            }
        }
        return entry;
    }