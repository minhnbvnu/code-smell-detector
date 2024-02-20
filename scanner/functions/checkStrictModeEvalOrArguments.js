function checkStrictModeEvalOrArguments(contextNode, name) {
                if (name && name.kind === 79 /* Identifier */) {
                    const identifier = name;
                    if (isEvalOrArgumentsIdentifier(identifier)) {
                        const span = getErrorSpanForNode(file, name);
                        file.bindDiagnostics.push(createFileDiagnostic(file, span.start, span.length, getStrictModeEvalOrArgumentsMessage(contextNode), idText(identifier)));
                    }
                }
            }