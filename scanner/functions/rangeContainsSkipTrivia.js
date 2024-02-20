function rangeContainsSkipTrivia(r1, node, file) {
            return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
        }