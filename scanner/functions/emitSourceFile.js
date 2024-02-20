function emitSourceFile(node) {
                writeLine();
                const statements = node.statements;
                const shouldEmitDetachedComment = statements.length === 0 || !isPrologueDirective(statements[0]) || nodeIsSynthesized(statements[0]);
                if (shouldEmitDetachedComment) {
                    emitBodyWithDetachedComments(node, statements, emitSourceFileWorker);
                    return;
                }
                emitSourceFileWorker(node);
            }