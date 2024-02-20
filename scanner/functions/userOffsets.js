function userOffsets() {
        var startYear = new Date().getFullYear() - 2,
            last = new OffsetAt(new Date(startYear, 0, 1)),
            offsets = [last],
            change, next, i;

        for (i = 1; i < 48; i++) {
            next = new OffsetAt(new Date(startYear, i, 1));
            if (next.offset !== last.offset) {
                change = findChange(last, next);
                offsets.push(change);
                offsets.push(new OffsetAt(new Date(change.at + 6e4)));
            }
            last = next;
        }

        for (i = 0; i < 4; i++) {
            offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
            offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
        }

        return offsets;
    }