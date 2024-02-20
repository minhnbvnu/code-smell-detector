function compareSourcePositions(left, right) {
            Debug.assert(left.sourceIndex === right.sourceIndex);
            return compareValues(left.sourcePosition, right.sourcePosition);
        }