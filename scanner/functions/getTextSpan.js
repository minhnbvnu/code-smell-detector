function getTextSpan(node, sourceFile, endNode2) {
            let start = node.getStart(sourceFile);
            let end = (endNode2 || node).getEnd();
            if (isStringLiteralLike(node) && end - start > 2) {
                Debug.assert(endNode2 === void 0);
                start += 1;
                end -= 1;
            }
            return createTextSpanFromBounds(start, end);
        }