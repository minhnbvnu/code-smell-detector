function rangeContainsRangeExclusive(r1, r2) {
            return rangeContainsPositionExclusive(r1, r2.pos) && rangeContainsPositionExclusive(r1, r2.end);
        }