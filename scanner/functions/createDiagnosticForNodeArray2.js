function createDiagnosticForNodeArray2(nodes, message, arg0, arg1, arg2) {
                        const start = nodes.pos;
                        return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2);
                    }