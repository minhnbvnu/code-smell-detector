function createTriggerSpanForNode(node, sourceFile) {
            let start = node.getStart(sourceFile);
            let width = node.getWidth(sourceFile);
            if (isStringLiteralLike(node)) {
                start += 1;
                width -= 2;
            }
            return createTextSpan(start, width);
        }