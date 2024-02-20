function sameMappedPosition(left, right) {
            return left.generatedPosition === right.generatedPosition && left.sourceIndex === right.sourceIndex && left.sourcePosition === right.sourcePosition;
        }