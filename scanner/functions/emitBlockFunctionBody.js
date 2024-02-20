function emitBlockFunctionBody(body) {
                onBeforeEmitNode == null ? void 0 : onBeforeEmitNode(body);
                writeSpace();
                writePunctuation("{");
                increaseIndent();
                const emitBlockFunctionBody2 = shouldEmitBlockFunctionBodyOnSingleLine(body) ? emitBlockFunctionBodyOnSingleLine : emitBlockFunctionBodyWorker;
                emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody2);
                decreaseIndent();
                writeToken(19 /* CloseBraceToken */, body.statements.end, writePunctuation, body);
                onAfterEmitNode == null ? void 0 : onAfterEmitNode(body);
            }