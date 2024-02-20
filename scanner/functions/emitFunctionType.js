function emitFunctionType(node) {
                pushNameGenerationScope(node);
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                writeSpace();
                writePunctuation("=>");
                writeSpace();
                emit(node.type);
                popNameGenerationScope(node);
            }