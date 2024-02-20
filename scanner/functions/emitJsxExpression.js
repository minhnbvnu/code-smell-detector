function emitJsxExpression(node) {
                var _a2;
                if (node.expression || !commentsDisabled && !nodeIsSynthesized(node) && hasCommentsAtPosition(node.pos)) {
                    const isMultiline = currentSourceFile && !nodeIsSynthesized(node) && getLineAndCharacterOfPosition(currentSourceFile, node.pos).line !== getLineAndCharacterOfPosition(currentSourceFile, node.end).line;
                    if (isMultiline) {
                        writer.increaseIndent();
                    }
                    const end = emitTokenWithComment(18 /* OpenBraceToken */, node.pos, writePunctuation, node);
                    emit(node.dotDotDotToken);
                    emitExpression(node.expression);
                    emitTokenWithComment(19 /* CloseBraceToken */, ((_a2 = node.expression) == null ? void 0 : _a2.end) || end, writePunctuation, node);
                    if (isMultiline) {
                        writer.decreaseIndent();
                    }
                }
            }