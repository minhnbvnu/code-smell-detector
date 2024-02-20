function assertRangeValid(range) {
        assertNotDetached(range);
        if (isOrphan(range.startContainer) || isOrphan(range.endContainer) ||
                !isValidOffset(range.startContainer, range.startOffset) ||
                !isValidOffset(range.endContainer, range.endOffset)) {
            throw new Error("Range error: Range is no longer valid after DOM mutation (" + range.inspect() + ")");
        }
    }