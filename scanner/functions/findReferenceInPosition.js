function findReferenceInPosition(refs, pos) {
            return find(refs, (ref) => textRangeContainsPositionInclusive(ref, pos));
        }