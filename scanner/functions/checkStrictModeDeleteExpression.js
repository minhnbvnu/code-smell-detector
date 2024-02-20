function checkStrictModeDeleteExpression(node) {
                if (inStrictMode && node.expression.kind === 79 /* Identifier */) {
                    const span = getErrorSpanForNode(file, node.expression);
                    file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode));
                }
            }