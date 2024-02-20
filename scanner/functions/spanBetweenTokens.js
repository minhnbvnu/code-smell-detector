function spanBetweenTokens(openToken, closeToken, hintSpanNode, sourceFile, autoCollapse = false, useFullStart = true) {
            const textSpan = createTextSpanFromBounds(useFullStart ? openToken.getFullStart() : openToken.getStart(sourceFile), closeToken.getEnd());
            return createOutliningSpan(textSpan, "code" /* Code */, createTextSpanFromNode(hintSpanNode, sourceFile), autoCollapse);
        }