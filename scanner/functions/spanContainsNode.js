function spanContainsNode(span, node, file) {
            return textSpanContainsPosition(span, node.getStart(file)) && node.getEnd() <= textSpanEnd(span);
        }