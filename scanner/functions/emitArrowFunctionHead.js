function emitArrowFunctionHead(node) {
                emitTypeParameters(node, node.typeParameters);
                emitParametersForArrow(node, node.parameters);
                emitTypeAnnotation(node.type);
                writeSpace();
                emit(node.equalsGreaterThanToken);
            }