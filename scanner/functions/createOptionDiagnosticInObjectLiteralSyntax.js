function createOptionDiagnosticInObjectLiteralSyntax(objectLiteral, onKey, key1, key2, message, arg0, arg1, arg2, arg3) {
                const props = getPropertyAssignment(objectLiteral, key1, key2);
                for (const prop of props) {
                    if ("messageText" in message) {
                        programDiagnostics.add(createDiagnosticForNodeFromMessageChain(options.configFile, onKey ? prop.name : prop.initializer, message));
                    }
                    else {
                        programDiagnostics.add(createDiagnosticForNodeInSourceFile(options.configFile, onKey ? prop.name : prop.initializer, message, arg0, arg1, arg2, arg3));
                    }
                }
                return !!props.length;
            }