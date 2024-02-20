function nodesOrTokensOverlap(first, second) {
        return (first.range[0] <= second.range[0] && first.range[1] >= second.range[0]) ||
            (second.range[0] <= first.range[0] && second.range[1] >= first.range[0]);
    }