function nodeOverlapsWithStartEnd(node, sourceFile, start, end) {
            return startEndOverlapsWithStartEnd(node.getStart(sourceFile), node.end, start, end);
        }