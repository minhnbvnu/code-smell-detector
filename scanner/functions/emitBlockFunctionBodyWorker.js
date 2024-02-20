function emitBlockFunctionBodyWorker(body, emitBlockFunctionBodyOnSingleLine2) {
                const statementOffset = emitPrologueDirectives(body.statements);
                const pos = writer.getTextPos();
                emitHelpers(body);
                if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine2) {
                    decreaseIndent();
                    emitList(body, body.statements, 768 /* SingleLineFunctionBodyStatements */);
                    increaseIndent();
                }
                else {
                    emitList(body, body.statements, 1 /* MultiLineFunctionBodyStatements */, 
                    /*parenthesizerRule*/
                    void 0, statementOffset);
                }
            }