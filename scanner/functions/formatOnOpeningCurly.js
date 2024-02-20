function formatOnOpeningCurly(position, sourceFile, formatContext) {
            const openingCurly = findImmediatelyPrecedingTokenOfKind(position, 18 /* OpenBraceToken */, sourceFile);
            if (!openingCurly) {
                return [];
            }
            const curlyBraceRange = openingCurly.parent;
            const outermostNode = findOutermostNodeWithinListLevel(curlyBraceRange);
            const textRange = {
                pos: getLineStartPositionForPosition(outermostNode.getStart(sourceFile), sourceFile),
                // TODO: GH#18217
                end: position
            };
            return formatSpan(textRange, sourceFile, formatContext, 4 /* FormatOnOpeningCurlyBrace */);
        }