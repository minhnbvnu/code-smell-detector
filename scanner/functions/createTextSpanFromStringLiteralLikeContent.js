function createTextSpanFromStringLiteralLikeContent(node) {
            if (node.isUnterminated)
                return void 0;
            return createTextSpanFromBounds(node.getStart() + 1, node.getEnd() - 1);
        }