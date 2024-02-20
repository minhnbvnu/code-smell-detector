function verifyForNever(context, _, nextNode, paddingLines) {
        if (paddingLines.length === 0) {
            return;
        }
        context.report({
            node: nextNode,
            messageId: 'unexpectedBlankLine',
            fix(fixer) {
                if (paddingLines.length >= 2) {
                    return null;
                }
                const prevToken = paddingLines[0][0];
                const nextToken = paddingLines[0][1];
                const start = prevToken.range[1];
                const end = nextToken.range[0];
                const text = context
                    .getSourceCode()
                    .text.slice(start, end)
                    .replace(PADDING_LINE_SEQUENCE, replacerToRemovePaddingLines);
                return fixer.replaceTextRange([start, end], text);
            },
        });
    }