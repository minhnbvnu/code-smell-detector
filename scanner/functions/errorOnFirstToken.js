function errorOnFirstToken(node, message, arg0, arg1, arg2) {
                const span = getSpanOfTokenAtPosition(file, node.pos);
                file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, message, arg0, arg1, arg2));
            }