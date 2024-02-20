function checkWithStatement(node) {
                if (!checkGrammarStatementInAmbientContext(node)) {
                    if (node.flags & 32768 /* AwaitContext */) {
                        grammarErrorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_an_async_function_block);
                    }
                }
                checkExpression(node.expression);
                const sourceFile = getSourceFileOfNode(node);
                if (!hasParseDiagnostics(sourceFile)) {
                    const start = getSpanOfTokenAtPosition(sourceFile, node.pos).start;
                    const end = node.statement.pos;
                    grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.The_with_statement_is_not_supported_All_symbols_in_a_with_block_will_have_type_any);
                }
            }