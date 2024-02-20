function emitJSDocFunctionType(node) {
                writeKeyword("function");
                emitParameters(node, node.parameters);
                writePunctuation(":");
                emit(node.type);
            }