function nodeIsSynthesized(range) {
            return positionIsSynthesized(range.pos) || positionIsSynthesized(range.end);
        }